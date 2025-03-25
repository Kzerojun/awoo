package com.awoo.payment.ui.facade.dto.request;

import com.awoo.payment.application.command.VerifyOneWonCommand;

public record VerifyOneWonRequest(String accountNo, String authCode) {

	public VerifyOneWonCommand toCommand(String memberId) {
		return VerifyOneWonCommand.builder()
				.accountNo(accountNo)
				.authCode(authCode)
				.memberId(Integer.valueOf(memberId))
				.build();
	}
}
