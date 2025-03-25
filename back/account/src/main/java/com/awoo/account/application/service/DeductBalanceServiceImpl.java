package com.awoo.account.application.service;


import com.awoo.account.application.command.DeductBalanceCommand;
import com.awoo.account.application.exception.InsufficientBalanceException;
import com.awoo.account.infra.ssafyfinance.SSAFYDemandDepositApiClient;
import com.awoo.account.infra.ssafyfinance.request.SSAFYDeductBalanceRequest;
import com.awoo.account.infra.ssafyfinance.request.SSAFYFetchBalanceRequest;
import com.awoo.account.infra.ssafyfinance.response.SSAFYFetchAccountResponse;
import com.awoo.account.support.SSAFYApiHelper;
import com.awoo.account.support.SSAFYCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeductBalanceServiceImpl implements DeductBalanceService{
//    private final MemberClient memberClient;
    private final SSAFYDemandDepositApiClient SSAFYApiClient;
    private final SSAFYApiHelper ssafyApiHelper;

    @Override
    public void deductBalance(DeductBalanceCommand command) {

        // 계좌 잔액 조회
        SSAFYFetchBalanceRequest request = SSAFYFetchBalanceRequest.builder()
                .Header(ssafyApiHelper.createHeader(command.memberId(), SSAFYCode.FETCH_BALANCE))
                .accountNo(command.accountNo())
                .build();
        SSAFYFetchAccountResponse fetchAccountResponse = SSAFYApiClient.fetchAccountBalance(
                request);

        // 현재 계좌 잔액이 충전하려는 금액보다 많은지 검사
        Long currentBalance = fetchAccountResponse.REC().accountBalance();
        if (currentBalance < command.amount()) {
            throw new InsufficientBalanceException();
        }

        //계좌 잔액 차감
        SSAFYDeductBalanceRequest deductRequest = SSAFYDeductBalanceRequest.builder()
                .Header(ssafyApiHelper.createHeader(command.memberId(),
                        SSAFYCode.DEDUCT_BALANCE))
                .accountNo(command.accountNo())
                .transactionBalance((long) command.amount())
                .build();
        SSAFYApiClient.deductBalance(deductRequest);
    }
}
