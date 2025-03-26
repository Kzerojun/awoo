package com.awoo.calendar.application.exception;

import lombok.Getter;

@Getter
public class CalendarSearchException extends ApplicationException{

    public CalendarSearchException() {
        super(ApplicationErrorCode.CALENDAR_NOT_FOUND);
    }
}
