package com.awoo.payment.ui.facade.dto.request;

import com.awoo.payment.application.command.RemitOneWonCommand;

public record RemitOneWonRequest(String accountNo) {

	public RemitOneWonCommand toCommand(String memberId) {
		return RemitOneWonCommand.builder()
				.memberId(Integer.valueOf(memberId))
				.accountNo(accountNo)
				.build();
	}
}
