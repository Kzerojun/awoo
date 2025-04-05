package com.awoo.account.application.service;

import com.awoo.account.application.command.*;
import com.awoo.account.application.exception.AccountApplicationErrorCode;
import com.awoo.account.application.exception.AccountApplicationException;
import com.awoo.account.domain.AccountEntity;
import com.awoo.account.domain.AccountRepository;
import com.awoo.account.domain.AccountType;
import com.awoo.account.infra.Kafka.KafkaProducer;
import com.awoo.account.infra.client.member.MemberClient;
import com.awoo.account.infra.ssafyfinance.SSAFYCommonApiClient;
import com.awoo.account.infra.ssafyfinance.SSAFYDemandDepositApiClient;
import com.awoo.account.infra.ssafyfinance.request.*;
import com.awoo.account.infra.ssafyfinance.response.*;
import com.awoo.account.infra.util.AESUtil;
import com.awoo.account.support.SSAFYApiHelper;
import com.awoo.account.support.SSAFYCode;
import com.awoo.account.ui.facade.dto.response.TransactionResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{

    private final SSAFYDemandDepositApiClient SSAFYApiClient;
    private final SSAFYCommonApiClient ssafyCommonApiClient;
    private final SSAFYApiHelper ssafyApiHelper;
    private final AESUtil aesUtil;
    private final AccountRepository accountRepository;
    private final KafkaProducer kafkaProducer;
    private final MemberClient memberClient;

    @Transactional
    public String createAccount(String memberId, CreateAccountCommand command) {
        if (!command.conditionsAgreement()) {
            throw new AccountApplicationException(AccountApplicationErrorCode.CONDITION_FALSE);
        }

        // SSAFY 계좌 생성 요청 생성
        SSAFYCreateAccountRequest request = SSAFYCreateAccountRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.CREATE_ACCOUNT))
                .accountTypeUniqueNo("999-1-791c997dad0041")
                .build();

        //SSAFY API 호출
        SSAFYCreateAccountResponse response = SSAFYApiClient.createAccount(request);

        //응답에서의 계좌 번호 암호화
        String encodedAccountNo = aesUtil.encrypt(response.REC().accountNo());

        //요청에서의 계좌 비밀번호 암호화
        String encodedPassword = aesUtil.encrypt(command.password());

        AccountEntity account = AccountEntity.builder()
                .memberId(Integer.valueOf(memberId))
                .bankCode(response.REC().bankCode())
                .accountNumber(encodedAccountNo)
                .password(encodedPassword)
                .conditionsAgreement(true)
                .accountType(AccountType.INTERNAL)
                .build();

        // DB 저장
        accountRepository.save(account);

        return response.REC().accountNo();
    }

    public List<SSAFYAccountResponseDto> getAccountList(String memberId) {
        //SSAFY 계좌 목록 조회 요청 생성
        SSAFYCommonHeaderRequest request = SSAFYCommonHeaderRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.ACCOUNT_LIST))
                .build();

        SSAFYAccountListResponse fetchAccountResponse = SSAFYApiClient.getAccountList(request);

        return fetchAccountResponse.REC();
    }

    public List<TransactionResponse> getTransactions(String memberId, TransactionsCommand command) {
        //SSAFY 계좌 거래 내역 요청 생성
        SSAFYTransactionsRequest request = SSAFYTransactionsRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.TransactionLIST))
                .accountNo(command.accountNo())
                .startDate(command.startDate())
                .endDate(command.endDate())
                .transactionType("A")
                .orderByType("DESC")
                .build();

//        System.out.println("요청 본문: " + request.toString());
        SSAFYTransactionsResponse fetchAccountResponse = SSAFYApiClient.getTransactions(request);
//        System.out.println("전체 응답: " + fetchAccountResponse.REC().toString());
        return fetchAccountResponse.REC().list();
    }

    public List<SSAFYTransferREC> transfer(String memberId, TransferCommand command) {
        //SSAFY 계좌 이체 요청 생성
        SSAFYTransferRequest request = SSAFYTransferRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.Transfer))
                .depositAccountNo(command.depositAccountNo())
                .depositTransactionSummary(command.depositTransactionSummary())
                .transactionBalance(command.transactionBalance())
                .withdrawalAccountNo(command.withdrawalAccountNo())
                .withdrawalTransactionSummary(command.withdrawalTransactionSummary())
                .build();

        SSAFYTransferResponse fetchAccountResponse = SSAFYApiClient.transfer(request);

        // kafka 요청 메시지 생성
        // 입금, 출금 계좌로 부터 각각 memberId 조회
        Integer senderId =  accountRepository.findByAccountNumber(aesUtil.encrypt(command.withdrawalAccountNo())).getMemberId();
        Integer receiverId = accountRepository.findByAccountNumber(aesUtil.encrypt(command.depositAccountNo())).getMemberId();

        //member 도메인에 memberId에 맵핑된 name 요청
        String senderName = memberClient.getMemberName(senderId);
        String receiverName = memberClient.getMemberName(receiverId);

        //kafka 메시지 발신
        kafkaProducer.send("account.transfer.v1",
                Map.of("senderId", senderId,
                        "senderName", senderName,
                        "transactionBalance", command.transactionBalance(),
                        "receiverId", receiverId,
                        "receiverName", receiverName));

        return fetchAccountResponse.REC();
    }

    public boolean confirmPassword(String accountNo, String password) {
        AccountEntity account = accountRepository.findByAccountNumber(aesUtil.encrypt(accountNo));
        return aesUtil.decrypt(account.getPassword()).equals(password);
    }

    public void writeMemo(String memberId, WriteMemoCommand command) {
        //SSAFY 거래내역 메모 요청 생성
        SSAFYWriteMemoRequest request = SSAFYWriteMemoRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.WRITE_MEMO))
                .accountNo(command.accountNo())
                .transactionUniqueNo(command.transactionUniqueNo())
                .transactionMemo(command.transactionMemo())
                .build();

        ssafyCommonApiClient.writeMemo(request);
    }

    @Transactional
    public void deleteAccount(String memberId, DeleteAccountCommand command) {
        //SSAFY 계좌 해지 요청 생성
        SSAFYDeleteAccountRequest request = SSAFYDeleteAccountRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.DELETE_ACCOUNT))
                .accountNo(command.accountNo())
                .refundAccountNo(command.refundAccountNo())
                .build();

        SSAFYApiClient.deleteAccount(request);

        //DB 정보 수정
        AccountEntity account = accountRepository.findByAccountNumber(aesUtil.encrypt(command.accountNo()));
        account.markDeleted();
    }

    public void changeLimit(String memberId, ChangeLimitCommand command) {
        //한도 변경 요청 생성
        SSAFYChangeLimitRequest request = SSAFYChangeLimitRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.CHANGE_LIMIT))
                .accountNo(command.accountNo())
                .oneTimeTransferLimit(command.oneTimeTransferLimit())
                .dailyTransferLimit(command.dailyTransferLimit())
                .build();

        SSAFYApiClient.changeLimit(request);
    }

    public void openAccountAuth(String memberId, String accountNo) {
        //1원 송금 요청 생성
        SSAFYOpenAccountAuthRequest request = SSAFYOpenAccountAuthRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.OPEN_ACCOUNT_AUTH))
                .accountNo(accountNo)
                .authText("AwOO")
                .build();

        ssafyCommonApiClient.openAccountAuth(request);
    }

    public void checkAuthCode(String memberId, String accountNo, String authCode) {
        //1원 검증 요청 생성
        SSAFYCheckAuthCodeRequest request = SSAFYCheckAuthCodeRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.CHECK_AUTH_CODE))
                .accountNo(accountNo)
                .authText("AwOO")
                .authCode(authCode)
                .build();

        ssafyCommonApiClient.checkAuthCode(request);
    }

}
