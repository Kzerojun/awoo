package com.awoo.payment.ui.facade.dto.request;

import com.awoo.payment.application.command.ChargeBalanceCommand;
import com.awoo.payment.ui.exception.AmountInvalidException;
import com.awoo.payment.ui.exception.IdempotencyKeyRequiredException;
import com.awoo.payment.ui.exception.MemberIdInvalidException;

public record ChargePaymentBalanceRequest(int chargeAmount) {

	public ChargeBalanceCommand toCommand(Integer memberId, String idempotencyKey) {
		validate(memberId,chargeAmount,idempotencyKey);

		return ChargeBalanceCommand.builder()
				.memberId(memberId)
				.amount(chargeAmount)
				.idempotencyKey(idempotencyKey)
				.build();
	}

	private void validate(Integer memberId, int amount, String idempotencyKey) {
		if (memberId == null || memberId <= 0) {
			throw new MemberIdInvalidException();
		}
		if (amount <= 0) {
			throw new AmountInvalidException();
		}
		if (idempotencyKey.isBlank()) {
			throw new IdempotencyKeyRequiredException();
		}
	}

}
