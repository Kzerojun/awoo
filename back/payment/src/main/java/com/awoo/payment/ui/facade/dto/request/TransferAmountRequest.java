package com.awoo.payment.ui.facade.dto.request;

import com.awoo.payment.application.command.TransferAmountCommand;

public record TransferAmountRequest(Integer amount, String receiverAccountNo) {


	public TransferAmountCommand toCommand(String memberId,String idempotencyKey) {
		return TransferAmountCommand.builder()
				.receiverAmountNo(receiverAccountNo)
				.idempotencyKey(idempotencyKey)
				.amount(amount)
				.memberId(Integer.valueOf(memberId))
				.build();
	}
}

