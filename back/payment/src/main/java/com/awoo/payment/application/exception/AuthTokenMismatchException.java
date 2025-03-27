package com.awoo.payment.application.exception;

public class AuthTokenMismatchException extends ApplicationException {
    public AuthTokenMismatchException(ApplicationErrorCode errorCode) {
        super(errorCode);
    }
}
