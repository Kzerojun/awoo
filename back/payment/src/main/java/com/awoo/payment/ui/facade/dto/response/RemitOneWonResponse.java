package com.awoo.payment.ui.facade.dto.response;

import com.awoo.payment.ui.facade.dto.response.constant.PaymentResponseMessage;

public record RemitOneWonResponse(String message) {

	public static RemitOneWonResponse create() {
		return new RemitOneWonResponse(PaymentResponseMessage.REMIT_ONE_WON_SUCCESS.getMessage());
	}
}
