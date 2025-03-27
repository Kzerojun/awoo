package com.awoo.payment.infra.client;

import com.awoo.payment.infra.client.request.SSAFYRemitOneWonRequest;
import com.awoo.payment.infra.client.request.SSAFYVerifyOneWonRequest;
import com.awoo.payment.infra.client.response.SSAFYRemitOneWonResponse;
import com.awoo.payment.infra.client.response.SSAFYVerifyOneWonResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "SSAFY-SERVICE", url = "https://finopenapi.ssafy.io/ssafy/api/v1/edu/accountAuth")
public interface SSAFYClient {

	@PostMapping("/openAccountAuth")
	SSAFYRemitOneWonResponse remitOneWon(@RequestBody SSAFYRemitOneWonRequest request);

	@PostMapping("/checkAuthCode")
	SSAFYVerifyOneWonResponse verifyOneWon(@RequestBody SSAFYVerifyOneWonRequest request);
}
