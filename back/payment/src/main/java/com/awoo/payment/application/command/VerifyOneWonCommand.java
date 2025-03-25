package com.awoo.payment.application.command;

import lombok.Builder;

public record VerifyOneWonCommand(Integer memberId, String accountNo, String authCode) {

	@Builder
	public VerifyOneWonCommand{

	}
}
