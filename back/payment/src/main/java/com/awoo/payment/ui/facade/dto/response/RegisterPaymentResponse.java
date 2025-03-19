package com.awoo.payment.ui.facade.dto.response;

public record RegisterPaymentResponse(Integer paymentId) {

    public static RegisterPaymentResponse create(Integer paymentId) {
        return new RegisterPaymentResponse(paymentId);
    }
}
