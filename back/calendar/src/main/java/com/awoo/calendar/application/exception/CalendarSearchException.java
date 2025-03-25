package com.awoo.calendar.application.exception;

import lombok.Getter;

@Getter
public class CalendarSearchException extends ApplicationException{

    private final ApplicationErrorCode applicationErrorCode;

    public CalendarSearchException(ApplicationErrorCode applicationErrorCode) {
        super(applicationErrorCode);
        this.applicationErrorCode = applicationErrorCode;
    }
}
