package com.awoo.payment.ui.facade.dto.request;

import com.awoo.payment.application.command.VerifyPaymentPasswordCommand;

public record CheckPaymentPasswordRequest(String password) {

	public VerifyPaymentPasswordCommand toCommand(String memberId) {
		return VerifyPaymentPasswordCommand.builder()
				.memberId(Integer.valueOf(memberId))
				.password(password)
				.build();
	}

}
