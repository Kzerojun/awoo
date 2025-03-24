package com.awoo.account.infra.ssafyfinance;

import com.awoo.account.application.dto.AccountCreateRequestDto;
import com.awoo.account.application.dto.AccountCreateResponseDto;
import com.awoo.account.application.dto.ssafyFinanceApiRequest;
import com.awoo.account.application.dto.ssafyFinanceApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ssafy-finance-api", url = "https://finopenapi.ssafy.io/ssafy/api/v1/edu/demandDeposit")
public interface ssafyDemandDepositApiClient {
    @PostMapping("/createDemandDepositAccount")
    ssafyFinanceApiResponse<AccountCreateResponseDto> createAccount(@RequestBody ssafyFinanceApiRequest<AccountCreateRequestDto> request);

}
