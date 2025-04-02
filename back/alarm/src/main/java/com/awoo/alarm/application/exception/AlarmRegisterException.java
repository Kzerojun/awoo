package com.awoo.alarm.application.exception;

public class AlarmRegisterException extends ApplicationException{

    public AlarmRegisterException() {
        super(ApplicationErrorCode.ALARM_REGISTRATION_FAILED);
    }
}
