package com.awoo.payment.application.exception;

public class PaymentNotFoundException extends ApplicationException {
    public PaymentNotFoundException() {
        super(ApplicationErrorCode.PAYMENT_NOT_FOUND);
    }
}
