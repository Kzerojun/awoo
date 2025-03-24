package com.awoo.payment.ui.facade.dto.response;

import com.awoo.payment.ui.facade.dto.response.constant.PaymentResponseMessage;

public record ChargeBalanceResponse(String message) {

	public static ChargeBalanceResponse create() {
		return new ChargeBalanceResponse(
				PaymentResponseMessage.CHARGE_PAYMENT_SUCCESS.getMessage());
	}

}
