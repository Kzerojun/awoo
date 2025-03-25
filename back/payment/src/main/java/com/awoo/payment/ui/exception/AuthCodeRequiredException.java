package com.awoo.payment.ui.exception;

public class AuthCodeRequiredException extends UiException {
    public AuthCodeRequiredException()
    {
        super(UiErrorCode.AUTH_CODE_REQUIRED);
    }
}
