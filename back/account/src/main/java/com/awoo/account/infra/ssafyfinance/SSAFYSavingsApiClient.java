package com.awoo.account.infra.ssafyfinance;

import com.awoo.account.infra.ssafyfinance.request.SSAFYCHANRequest;
import com.awoo.account.infra.ssafyfinance.request.SSAFYCommonHeaderRequest;
import com.awoo.account.infra.ssafyfinance.request.SSAFYCreateSavingAccountRequest;
import com.awoo.account.infra.ssafyfinance.response.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "ssafy-finance-savings-api", url = "https://finopenapi.ssafy.io/ssafy/api/v1/edu/savings")
public interface SSAFYSavingsApiClient {

    @PostMapping("/createAccount")
    SSAFYCreateSavingAccountResponse createSavingAccount(@RequestBody SSAFYCreateSavingAccountRequest request);

    @PostMapping("/inquireAccountList")
    SSAFYSavingAccountListResponse getSavingAccountList(@RequestBody SSAFYCommonHeaderRequest request);

    @PostMapping("/inquireAccount")
    SSAFYSavingAccountResponse getSavingAccount(@RequestBody SSAFYCHANRequest request);

    @PostMapping("/inquireExpiryInterest")
    SSAFYInterestPayResponse getInterestPay(@RequestBody SSAFYCHANRequest request);

    @PostMapping("/inquireEarlyTerminationInterest")
    SSAFYEarlyInterestPayResponse getEarlyInterestPay(@RequestBody SSAFYCHANRequest request);

    @PostMapping("/deleteAccount")
    void deleteSavingAccount(@RequestBody SSAFYCHANRequest request);

    @PostMapping("/inquirePayment")
    SSAFYISPaymentResponse InquireSavingPaymentResponse(@RequestBody SSAFYCHANRequest request);
}
