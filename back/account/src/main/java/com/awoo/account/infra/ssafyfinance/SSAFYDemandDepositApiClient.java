package com.awoo.account.infra.ssafyfinance;

import com.awoo.account.application.dto.AccountCreateRequestDto;
import com.awoo.account.application.dto.AccountCreateResponseDto;
import com.awoo.account.application.dto.SSAFYFinanceApiRequest;
import com.awoo.account.application.dto.SSAFYFinanceApiResponse;
import com.awoo.account.infra.ssafyfinance.request.SSAFYDeductBalanceRequest;
import com.awoo.account.infra.ssafyfinance.request.SSAFYFetchAccountRequest;
import com.awoo.account.infra.ssafyfinance.response.SSAFYFetchAccountResponse;
import com.awoo.account.infra.ssafyfinance.response.SSAFYDeductBalanceResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "ssafy-finance-api", url = "https://finopenapi.ssafy.io/ssafy/api/v1/edu/demandDeposit")
public interface SSAFYDemandDepositApiClient {
    @PostMapping("/createDemandDepositAccount")
    SSAFYFinanceApiResponse<AccountCreateResponseDto> createAccount(@RequestBody SSAFYFinanceApiRequest<AccountCreateRequestDto> request);

    @PostMapping("/inquireDemandDepositAccountBalance")
    SSAFYFinanceApiResponse<SSAFYFetchAccountResponse> fetchAccountBalance(@RequestBody SSAFYFinanceApiRequest<SSAFYFetchAccountRequest> request);

    @PostMapping("/updateDemandDepositAccountWithdrawal")
    SSAFYFinanceApiResponse<SSAFYDeductBalanceResponse> deductBalance(@RequestParam SSAFYFinanceApiRequest<SSAFYDeductBalanceRequest> request);
}
