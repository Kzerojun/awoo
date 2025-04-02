package com.awoo.alarm.application.exception;

public class FcmAccessTokenNotFoundException extends ApplicationException{

    public FcmAccessTokenNotFoundException() {
        super(ApplicationErrorCode.FCM_ACCESS_TOKEN_NOT_FOUND);
    }
}
