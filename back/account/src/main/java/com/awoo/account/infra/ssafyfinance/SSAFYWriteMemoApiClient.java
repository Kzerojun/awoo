package com.awoo.account.infra.ssafyfinance;

import com.awoo.account.infra.ssafyfinance.request.SSAFYWriteMemoRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "ssafy-finance-memo-api", url = "https://finopenapi.ssafy.io/ssafy/api/v1/edu")
public interface SSAFYWriteMemoApiClient {
    @PostMapping("/transactionMemo")
    void writeMemo(SSAFYWriteMemoRequest request);
}
