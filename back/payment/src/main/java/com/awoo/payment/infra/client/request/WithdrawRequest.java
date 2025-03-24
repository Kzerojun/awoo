package com.awoo.payment.infra.client.request;

import lombok.Builder;

public record WithdrawRequest(Integer memberId, int amount,String accountNo) {

	@Builder
	public WithdrawRequest{

	}
}
