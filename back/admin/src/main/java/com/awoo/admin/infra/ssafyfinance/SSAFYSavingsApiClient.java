package com.awoo.admin.infra.ssafyfinance;

import com.awoo.admin.infra.ssafyfinance.request.SSAFYCommonHeaderRequest;
import com.awoo.admin.infra.ssafyfinance.request.SSAFYCreateSavingProductRequest;
import com.awoo.admin.infra.ssafyfinance.response.SSAFYSavingsProductResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "ssafy-finance-savings-api", url = "https://finopenapi.ssafy.io/ssafy/api/v1/edu/savings")
public interface SSAFYSavingsApiClient {

    @PostMapping("/createProduct")
    void createSavingProduct(SSAFYCreateSavingProductRequest request);

    @PostMapping("/inquireSavingsProducts")
    SSAFYSavingsProductResponse getSavingsProduct(SSAFYCommonHeaderRequest request);
}
