package com.awoo.admin.infra.ssafyfinance;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "ssafy-finance-common-api", url = "https://finopenapi.ssafy.io/ssafy/api/v1/edu")
public interface SSAFYCommonApiClient {

}
