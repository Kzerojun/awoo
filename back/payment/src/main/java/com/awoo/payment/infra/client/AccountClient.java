package com.awoo.payment.infra.client;

import com.awoo.payment.infra.client.request.WithdrawRequest;
import com.awoo.payment.infra.client.response.WithdrawResponse;
import com.awoo.payment.support.ApiUtils.ApiResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "account-service", url = "http://localhost/api/accounts")
public interface AccountClient {

	@PostMapping("/withdraw")
	ApiResult<WithdrawResponse> withdraw(@RequestBody WithdrawRequest request);
}
