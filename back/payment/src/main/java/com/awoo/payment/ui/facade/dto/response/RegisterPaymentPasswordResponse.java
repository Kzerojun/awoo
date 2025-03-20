package com.awoo.payment.ui.facade.dto.response;

public record RegisterPaymentPasswordResponse(PaymentResponseMessage message) {

    public static RegisterPaymentPasswordResponse create() {
        return new RegisterPaymentPasswordResponse(PaymentResponseMessage.REGISTER_PAYMENT_PASSWORD);
    }
}
