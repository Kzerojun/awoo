package com.awoo.payment.ui.facade.dto.response;

import com.awoo.payment.ui.facade.dto.response.constant.PaymentResponseMessage;

public record VerifyOneWonResponse(String message) {


	public static VerifyOneWonResponse create() {
		return new VerifyOneWonResponse(PaymentResponseMessage.VERIFY_ONE_WON_SUCCESS.getMessage());
	}
}
