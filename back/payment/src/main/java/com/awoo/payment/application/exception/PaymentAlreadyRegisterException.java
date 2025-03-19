package com.awoo.payment.application.exception;

public class PaymentAlreadyRegisterException extends ApplicationException{

    private final ApplicationErrorCode applicationErrorCode;

    public PaymentAlreadyRegisterException(ApplicationErrorCode applicationErrorCode){
        super(applicationErrorCode);
        this.applicationErrorCode = applicationErrorCode;
    }
}
