package com.awoo.payment.infra.client;

import com.awoo.payment.infra.client.request.SSAFYDepositRequest;
import com.awoo.payment.infra.client.response.SSAFYDepositResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "SSAFY-DEPOSIT-SERVICE", url = "https://finopenapi.ssafy.io/ssafy/api/v1/edu/demandDeposit")
public interface SSAFYDemandDepositClient {

	@PostMapping("/updateDemandDepositAccountDeposit")
	SSAFYDepositResponse deposit(@RequestBody SSAFYDepositRequest request);
}
