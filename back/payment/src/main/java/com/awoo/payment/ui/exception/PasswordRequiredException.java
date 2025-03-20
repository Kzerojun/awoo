package com.awoo.payment.ui.exception;

public class PasswordRequiredException extends UiException {

    public PasswordRequiredException() {
        super(UiErrorCode.PASSWORD_REQUIRED);
    }
}