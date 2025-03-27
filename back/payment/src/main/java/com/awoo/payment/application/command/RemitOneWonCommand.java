package com.awoo.payment.application.command;

import lombok.Builder;

public record RemitOneWonCommand(Integer memberId, String accountNo) {

	@Builder
	public RemitOneWonCommand{

	}

}
