package com.awoo.account.application.service;

import com.awoo.account.application.command.CreateAccountCommand;
import com.awoo.account.application.command.TransactionsCommand;
import com.awoo.account.application.command.TransferCommand;
import com.awoo.account.infra.ssafyfinance.response.*;
import com.awoo.account.infra.ssafyfinance.request.SSAFYTransferRequest;
import com.awoo.account.domain.AccountEntity;
import com.awoo.account.domain.AccountRepository;
import com.awoo.account.infra.ssafyfinance.SSAFYDemandDepositApiClient;
import com.awoo.account.infra.ssafyfinance.request.SSAFYAccountListRequest;
import com.awoo.account.infra.ssafyfinance.request.SSAFYCreateAccountRequest;
import com.awoo.account.infra.ssafyfinance.request.SSAFYTransactionsRequest;
import com.awoo.account.infra.util.AESUtil;
import com.awoo.account.support.SSAFYApiHelper;
import com.awoo.account.support.SSAFYCode;
import com.awoo.account.ui.facade.dto.response.TransactionResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{

//    private final MemberClient memberClient;
    private final SSAFYDemandDepositApiClient SSAFYApiClient;
    private final SSAFYApiHelper ssafyApiHelper;
    private final AESUtil aesUtil;
    private final AccountRepository accountRepository;

    @Transactional
    public void createAccount(String memberId, CreateAccountCommand command) throws Exception {
        // SSAFY 계좌 생성 요청 생성
        SSAFYCreateAccountRequest request = SSAFYCreateAccountRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.CREATE_ACCOUNT))
                .accountTypeUniqueNo("999-1-2f9c2ea1789943")    //Test 계좌 상품 연결
                .build();

        //SSAFY API 호출
        SSAFYFetchAccountResponse fetchAccountResponse = SSAFYApiClient.createAccount(request);

        //응답에서의 계좌 번호 암호화
        String encodedAccountNo = aesUtil.encrypt(fetchAccountResponse.REC().accountNo());

        //응답에서의 계좌 비밀번호 암호화
        String encodedPassword = aesUtil.encrypt(command.password());

        AccountEntity account = AccountEntity.builder()
                .memberId(Integer.valueOf(memberId))
                .bankCode(fetchAccountResponse.REC().bankCode())
                .accountNumber(encodedAccountNo)
                .password(encodedPassword)
                .conditionsAgreement(command.conditionsAgreement())
                .build();

        // DB 저장
        accountRepository.save(account);
    }

    public List<SSAFYAccountResponseDto> getAccountList(String memberId) {
        //SSAFY 계좌 목록 조회 요청 생성
        SSAFYAccountListRequest request = SSAFYAccountListRequest.builder()
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
        return fetchAccountResponse.REC();
    }
}
