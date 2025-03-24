package com.awoo.payment.domain.event;

import lombok.Builder;

public record BalanceChargeProcessedEvent(Integer memberId, int chargeAmount) {

	@Builder
	public BalanceChargeProcessedEvent {

	}
}
