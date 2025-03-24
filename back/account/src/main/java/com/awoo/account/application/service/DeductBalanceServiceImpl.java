package com.awoo.account.application.service;


import com.awoo.account.application.command.DeductBalanceCommand;
import com.awoo.account.application.dto.SSAFYFinanceApiRequest;
import com.awoo.account.application.dto.SSAFYFinanceApiResponse;
import com.awoo.account.application.exception.InsufficientBalanceException;
import com.awoo.account.domain.AccountRepository;
import com.awoo.account.infra.client.member.MemberClient;
import com.awoo.account.infra.client.member.response.FetchMemberKeyResponse;
import com.awoo.account.infra.ssafyfinance.SSAFYDemandDepositApiClient;
import com.awoo.account.infra.ssafyfinance.request.SSAFYDeductBalanceRequest;
import com.awoo.account.infra.ssafyfinance.request.SSAFYFetchAccountRequest;
import com.awoo.account.infra.ssafyfinance.response.SSAFYFetchAccountResponse;
import com.awoo.account.support.ApiUtils;
import com.awoo.account.support.SSAFYApiHelper;
import com.awoo.account.support.SSAFYCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeductBalanceServiceImpl implements DeductBalanceService{
    private final MemberClient memberClient;
    private final SSAFYDemandDepositApiClient SSAFYApiClient;
    private final SSAFYApiHelper ssafyApiHelper;

    @Override
    public void deductBalance(DeductBalanceCommand command) {
        // MemberKey 조회
        ApiUtils.ApiResult<FetchMemberKeyResponse> response = memberClient.fetchMemberKey(command.memberId());

        // 계좌 잔액 조회
        SSAFYFinanceApiRequest<SSAFYFetchAccountRequest> request = SSAFYFinanceApiRequest.<SSAFYFetchAccountRequest>builder()
                .Header(ssafyApiHelper.createHeader(
                        response.getResponse().memberKey(),
                        SSAFYCode.FETCH_BALANCE))
                .body(SSAFYFetchAccountRequest.builder()
                        .accountNo(command.accountNo()).build())
                .build();
        SSAFYFinanceApiResponse<SSAFYFetchAccountResponse> fetchAccountBalanceResponse = SSAFYApiClient.fetchAccountBalance(request);

        // 현재 계좌 잔액이 충전하려는 금액보다 많은지 검사
        Long currentBalance = fetchAccountBalanceResponse.getREC().get(0).accountBalance();
        if (currentBalance < command.amount()) {
            throw new InsufficientBalanceException();
        }

        //계좌 잔액 차감
        SSAFYFinanceApiRequest<SSAFYDeductBalanceRequest> deductRequest = SSAFYFinanceApiRequest.<SSAFYDeductBalanceRequest>builder()
                .Header(ssafyApiHelper.createHeader(response.getResponse().memberKey(), SSAFYCode.DEDUCT_BALANCE))
                .body(SSAFYDeductBalanceRequest.builder()
                        .accountNo(command.accountNo())
                        .transactionBalance((long) command.amount())
                        .build())
                .build();
        SSAFYApiClient.deductBalance(deductRequest);
    }
}
