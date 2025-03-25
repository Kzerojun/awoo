package com.awoo.account.infra.ssafyfinance;

import com.awoo.account.application.dto.SSAFYFinanceApiResponse;
import com.awoo.account.infra.ssafyfinance.request.*;
import com.awoo.account.infra.ssafyfinance.response.SSAFYAccountListResponse;
import com.awoo.account.infra.ssafyfinance.response.SSAFYDeductBalanceResponse;
import com.awoo.account.infra.ssafyfinance.response.SSAFYFetchAccountResponse;
import com.awoo.account.infra.ssafyfinance.response.SSAFYTransactionsResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ssafy-finance-api", url = "https://finopenapi.ssafy.io/ssafy/api/v1/edu/demandDeposit")
public interface SSAFYDemandDepositApiClient {
    @PostMapping("/createDemandDepositAccount")
    SSAFYFetchAccountResponse createAccount(@RequestBody SSAFYCreateAccountRequest request);

    @PostMapping("/inquireDemandDepositAccountList")
    SSAFYAccountListResponse getAccountList(@RequestBody SSAFYAccountListRequest request);
//    SSAFYFetchAccountResponse getAccountList(@RequestBody SSAFYAccountListRequest request);

    @PostMapping("/inquireDemandDepositAccountBalance")
    SSAFYFetchAccountResponse fetchAccountBalance(@RequestBody SSAFYFetchBalanceRequest request);

    @PostMapping("/updateDemandDepositAccountWithdrawal")
    SSAFYFinanceApiResponse<SSAFYDeductBalanceResponse> deductBalance(@RequestBody SSAFYDeductBalanceRequest request);

    @PostMapping("/inquireTransactionHistoryList")
    SSAFYTransactionsResponse getTransactions(@RequestBody SSAFYTransactionsRequest request);

}
