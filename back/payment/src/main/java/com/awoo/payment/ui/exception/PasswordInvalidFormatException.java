package com.awoo.payment.ui.exception;

public class PasswordInvalidFormatException extends UiException{

    public PasswordInvalidFormatException() {
        super(UiErrorCode.PASSWORD_INVALID_FORMAT);
    }
}
