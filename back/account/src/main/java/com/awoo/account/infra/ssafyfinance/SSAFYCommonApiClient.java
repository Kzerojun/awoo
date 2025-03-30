package com.awoo.account.infra.ssafyfinance;

import com.awoo.account.infra.ssafyfinance.request.SSAFYCheckAuthCodeRequest;
import com.awoo.account.infra.ssafyfinance.request.SSAFYOpenAccountAuthRequest;
import com.awoo.account.infra.ssafyfinance.request.SSAFYWriteMemoRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "ssafy-finance-common-api", url = "https://finopenapi.ssafy.io/ssafy/api/v1/edu")
public interface SSAFYCommonApiClient {
    @PostMapping("/transactionMemo")
    void writeMemo(SSAFYWriteMemoRequest request);

    @PostMapping("/accountAuth/openAccountAuth")
    void openAccountAuth(SSAFYOpenAccountAuthRequest request);

    @PostMapping("/accountAuth/checkAuthCode")
    void checkAuthCode(SSAFYCheckAuthCodeRequest request);
}
