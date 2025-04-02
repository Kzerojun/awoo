package com.awoo.admin.infra.ssafyfinance;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "ssafy-finance-accounts-api", url = "https://finopenapi.ssafy.io/ssafy/api/v1/edu/demandDeposit")
public interface SSAFYDemandDepositApiClient {

}
