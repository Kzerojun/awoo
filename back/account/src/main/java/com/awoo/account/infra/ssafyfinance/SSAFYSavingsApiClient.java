package com.awoo.account.infra.ssafyfinance;

import com.awoo.account.infra.ssafyfinance.request.SSAFYCreateSavingAccountRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ssafy-finance-savings-api", url = "https://finopenapi.ssafy.io/ssafy/api/v1/edu/savings")
public interface SSAFYSavingsApiClient {

    @PostMapping("createAccount")
    void createSavingAccount(@RequestBody SSAFYCreateSavingAccountRequest request);


}
