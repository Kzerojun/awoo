package com.awoo.payment.application.exception;

import lombok.Getter;

@Getter
public class PaymentAlreadyRegisterException extends ApplicationException{

    private final ApplicationErrorCode applicationErrorCode;

    public PaymentAlreadyRegisterException(ApplicationErrorCode applicationErrorCode){
        super(applicationErrorCode);
        this.applicationErrorCode = applicationErrorCode;
    }
}
