package com.awoo.payment.infra.client;

import com.awoo.payment.infra.client.response.UsedProductInfoResponse;
import com.awoo.payment.support.ApiUtils;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "USED-PRODUCT-SERVICE")
public interface UsedProductClient {

    @GetMapping("api/used-products/{usedProductId}")
    ApiUtils.ApiResult<UsedProductInfoResponse> fetchUsedProduct(@PathVariable Integer usedProductId);
}
