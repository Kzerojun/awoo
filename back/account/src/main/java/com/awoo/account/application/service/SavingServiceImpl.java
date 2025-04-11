package com.awoo.account.application.service;

import com.awoo.account.application.command.CreateSavingAccountCommand;
import com.awoo.account.domain.AccountEntity;
import com.awoo.account.domain.AccountRepository;
import com.awoo.account.domain.AccountType;
import com.awoo.account.infra.Kafka.KafkaProducer;
import com.awoo.account.infra.ssafyfinance.SSAFYSavingsApiClient;
import com.awoo.account.infra.ssafyfinance.request.SSAFYCHANRequest;
import com.awoo.account.infra.ssafyfinance.request.SSAFYCommonHeaderRequest;
import com.awoo.account.infra.ssafyfinance.request.SSAFYCreateSavingAccountRequest;
import com.awoo.account.infra.ssafyfinance.request.SSAFYSavingAccountDto;
import com.awoo.account.infra.ssafyfinance.response.SSAFYCreateSavingAccountResponse;
import com.awoo.account.infra.util.AESUtil;
import com.awoo.account.support.SSAFYApiHelper;
import com.awoo.account.support.SSAFYCode;
import com.awoo.account.ui.facade.dto.response.EarlyInterestPayResponse;
import com.awoo.account.ui.facade.dto.response.InquireSavingPaymentResponse;
import com.awoo.account.ui.facade.dto.response.InterestPayResponse;
import com.awoo.account.ui.facade.dto.response.SavingAccountResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SavingServiceImpl implements SavingService{

    private final SSAFYApiHelper ssafyApiHelper;
    private final SSAFYSavingsApiClient SSAFYApiClient;
    private final AESUtil aesUtil;
    private final AccountRepository accountRepository;
    private final KafkaProducer kafkaProducer;
    public void createSavingAccount(String memberId, CreateSavingAccountCommand command) {
        //SSAFY 적금 계좌 생성 요청 생성
        SSAFYCreateSavingAccountRequest request = SSAFYCreateSavingAccountRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.CREATE_SAVING_ACCOUNT))
                .accountTypeUniqueNo(command.accountTypeUniqueNo())
                .depositBalance(command.depositBalance())
                .withdrawalAccountNo(command.withdrawalAccountNo())
                .build();

        //SSAFY 적금 계좌 생성 요청 전송
        SSAFYCreateSavingAccountResponse response = SSAFYApiClient.createSavingAccount(request);

        //응답에서의 계좌 번호 암호화
        String encodedAccountNo = aesUtil.encrypt(response.REC().accountNo());

        //요청에서의 계좌 비밀번호 암호화
        String encodedPassword = aesUtil.encrypt(command.password());

        AccountEntity account = AccountEntity.builder()
                .memberId(Integer.valueOf(memberId))
                .bankCode(response.REC().bankCode())
                .accountNumber(encodedAccountNo)
                .password(encodedPassword)
                .conditionsAgreement(command.conditionsAgreement())
                .accountType(AccountType.SAVING)
                .petId(command.petId())
                .build();

        // DB 저장
        accountRepository.save(account);

        //펫 서버에 saving-id 전달
        Map<String, Integer> kafkaMessage = new HashMap<>();
        kafkaMessage.put("petId", account.getPetId());
        kafkaMessage.put("savingId", account.getAccountId());
        kafkaProducer.send("account.saving.created.v1", kafkaMessage);
    }

    public List<SavingAccountResponse> getSavingAccountList(String memberId) {
        SSAFYCommonHeaderRequest request = SSAFYCommonHeaderRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.SAVING_ACCOUNT_LIST))
                .build();

        List<SSAFYSavingAccountDto> feignResponse = SSAFYApiClient.getSavingAccountList(request).REC().list();

        List<AccountEntity> accounts = accountRepository.findAllByMemberIdAndAccountType(
                Integer.valueOf(memberId),
                AccountType.SAVING
        );

        Map<String, Integer> petIdMap = new HashMap<>();
        for (AccountEntity account : accounts) {
            String encrypted = account.getAccountNumber();
            if (encrypted == null) continue;

            String decrypted = aesUtil.decrypt(encrypted);
            if (decrypted == null) continue;

            petIdMap.put(decrypted, account.getPetId()); // petId는 null일 수 있음 → OK
        }

        List<SavingAccountResponse> result = new ArrayList<>();
        for (SSAFYSavingAccountDto dto : feignResponse) {
            String accountNo = dto.accountNo();
            Integer petId = petIdMap.get(accountNo);

            SavingAccountResponse response = SavingAccountResponse.from(dto, petId);
            result.add(response);
        }


        return result;
    }


    public SavingAccountResponse getSavingAccount(String memberId, Integer savingId) {
        //적금Id로 계좌 정보 조회
        AccountEntity account = accountRepository.findByAccountId(savingId);

        if (account == null) {  //해당 적금 계좌가 없는 경우
            return null;
        }

        //SSAFY 적금 계좌 단건 조회 요청 생성
        SSAFYCHANRequest request = SSAFYCHANRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.INQUIRE_SAVING_ACCOUNT))
                .accountNo(aesUtil.decrypt(account.getAccountNumber()))
                .build();

        SSAFYSavingAccountDto dto = SSAFYApiClient.getSavingAccount(request).REC();
        return SavingAccountResponse.from(dto, account.getPetId());
    }

    public InterestPayResponse getInterestPay(String memberId, String accountNo) {
        //SSAFY 적금 만기 해지 이자 요청 생성
        SSAFYCHANRequest request = SSAFYCHANRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.INTEREST_PAYMENT))
                .accountNo(accountNo)
                .build();

        return SSAFYApiClient.getInterestPay(request).REC();
    }

    public EarlyInterestPayResponse getEarlyInterestPay(String memberId, String accountNo) {
        //SSAFY 적금 중도 해지 이자 요청 생성
        SSAFYCHANRequest request = SSAFYCHANRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.EARLY_INTEREST_PAYMENT))
                .accountNo(accountNo)
                .build();

        return SSAFYApiClient.getEarlyInterestPay(request).REC();
    }

    @Transactional
    public void deleteSavingAccount(String memberId, String accountNo) {
        //SSAFY 적금 중도 해지 요청 생성
        SSAFYCHANRequest request = SSAFYCHANRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.DELETE_SAVING_ACCOUNT))
                .accountNo(accountNo)
                .build();

        SSAFYApiClient.deleteSavingAccount(request);

        //DB 변경
        AccountEntity account = accountRepository.findByAccountNumber(aesUtil.encrypt(accountNo));
        account.markDeleted();

        //펫 서버에 saving-id 0으로 전달
        Map<String, Integer> kafkaMessage = new HashMap<>();
        kafkaMessage.put("petId", account.getPetId());
        kafkaMessage.put("savingId", 0);
        kafkaProducer.send("account.saving.created.v1", kafkaMessage);
    }

    public InquireSavingPaymentResponse InquireSavingPaymentResponse(String memberId, String accountNo) {
        //SSAFY 적금 납입 회차 조회 요청 생성
        SSAFYCHANRequest request = SSAFYCHANRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.INQUIRE_SAVING_PAYMENT))
                .accountNo(accountNo)
                .build();

        return SSAFYApiClient.InquireSavingPaymentResponse(request).REC().get(0);
    }


}
