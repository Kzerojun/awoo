package com.awoo.payment.application.command;

import lombok.Builder;

public record ChargeBalanceCancelCommand(Integer memberId, int amount, String idempotencyKey) {

	@Builder
	public ChargeBalanceCancelCommand {

	}

}
