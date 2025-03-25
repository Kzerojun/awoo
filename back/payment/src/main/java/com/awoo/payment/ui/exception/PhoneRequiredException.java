package com.awoo.payment.ui.exception;

public class PhoneRequiredException extends UiException {
    public PhoneRequiredException() {
        super(UiErrorCode.PHONE_REQUIRED);
    }
}
