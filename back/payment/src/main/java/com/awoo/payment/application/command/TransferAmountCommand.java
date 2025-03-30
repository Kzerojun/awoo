package com.awoo.payment.application.command;

import lombok.Builder;

public record TransferAmountCommand(Integer memberId, Integer amount, String receiverAmountNo,String idempotencyKey) {

	@Builder
	public TransferAmountCommand{

	}
}
