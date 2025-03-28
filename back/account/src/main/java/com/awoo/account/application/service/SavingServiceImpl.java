package com.awoo.account.application.service;

import com.awoo.account.application.command.CreateSavingAccountCommand;
import com.awoo.account.domain.AccountEntity;
import com.awoo.account.domain.AccountRepository;
import com.awoo.account.domain.AccountType;
import com.awoo.account.infra.ssafyfinance.SSAFYSavingsApiClient;
import com.awoo.account.infra.ssafyfinance.request.SSAFYCHANRequest;
import com.awoo.account.infra.ssafyfinance.request.SSAFYCommonHeaderRequest;
import com.awoo.account.infra.ssafyfinance.request.SSAFYCreateSavingAccountRequest;
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

import java.util.List;

@Service
@RequiredArgsConstructor
public class SavingServiceImpl implements SavingService{

    private final SSAFYApiHelper ssafyApiHelper;
    private final SSAFYSavingsApiClient SSAFYApiClient;
    private final AESUtil aesUtil;
    private final AccountRepository accountRepository;
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
                .build();

        // DB 저장
        accountRepository.save(account);
    }

    public List<SavingAccountResponse> getSavingAccountList(String memberId) {
        //SSAFY 적금 계좌 목록 요청 생성
        SSAFYCommonHeaderRequest request = SSAFYCommonHeaderRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.SAVING_ACCOUNT_LIST))
                .build();

        return SSAFYApiClient.getSavingAccountList(request).REC().list();
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
        AccountEntity account = accountRepository.findByAccountNumber(accountNo);
        account.markDeleted();
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
