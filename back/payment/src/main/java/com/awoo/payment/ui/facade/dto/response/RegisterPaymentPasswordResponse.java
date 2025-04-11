package com.awoo.payment.ui.facade.dto.response;

import com.awoo.payment.ui.facade.dto.response.constant.PaymentResponseMessage;

public record RegisterPaymentPasswordResponse(PaymentResponseMessage message) {

    public static RegisterPaymentPasswordResponse create() {
        return new RegisterPaymentPasswordResponse(PaymentResponseMessage.REGISTER_PAYMENT_PASSWORD);
    }
}
