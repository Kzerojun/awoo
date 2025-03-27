package com.awoo.calendar.application.exception;

import lombok.Getter;

@Getter
public class CalendarNotFoundException extends ApplicationException{

    public CalendarNotFoundException() {
        super(ApplicationErrorCode.CALENDAR_NOT_FOUND);
    }
}
