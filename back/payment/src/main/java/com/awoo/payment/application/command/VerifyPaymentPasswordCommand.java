package com.awoo.payment.application.command;

import lombok.Builder;

public record VerifyPaymentPasswordCommand(String password, Integer memberId) {

	@Builder
	public VerifyPaymentPasswordCommand {

	}

}
