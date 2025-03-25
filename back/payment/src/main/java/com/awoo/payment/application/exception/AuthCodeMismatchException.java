package com.awoo.payment.application.exception;

public class AuthCodeMismatchException extends ApplicationException {
    public AuthCodeMismatchException(ApplicationErrorCode applicationErrorCode) {
        super(applicationErrorCode);
    }
}
