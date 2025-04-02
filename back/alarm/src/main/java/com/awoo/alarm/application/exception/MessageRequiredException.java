package com.awoo.alarm.application.exception;

public class MessageRequiredException extends ApplicationException{

    public MessageRequiredException() {
        super(ApplicationErrorCode.MAKE_MESSAGE_FAILED);
    }
}
