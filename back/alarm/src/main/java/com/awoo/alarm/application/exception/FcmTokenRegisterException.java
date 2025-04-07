package com.awoo.alarm.application.exception;

public class FcmTokenRegisterException extends ApplicationException{

    public FcmTokenRegisterException() {
        super(ApplicationErrorCode.FCM_TOKEN_REGISTRATION_FAILED);
    }
}
