package com.awoo.payment.ui.facade.dto.response;

import lombok.Builder;

public record VerifyPaymentPasswordResponse(boolean isPasswordMatched) {

	@Builder
	public VerifyPaymentPasswordResponse{

	}
}
