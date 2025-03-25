package com.awoo.calendar.application.exception;

import lombok.Getter;

@Getter
public class CalendarRegisterException extends ApplicationException {

    private final ApplicationErrorCode applicationErrorCode;

    public CalendarRegisterException(ApplicationErrorCode applicationErrorCode){
        super(applicationErrorCode);
        this.applicationErrorCode = applicationErrorCode;
    }
}
