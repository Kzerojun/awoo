package com.awoo.calendar.application.exception;

import lombok.Getter;

@Getter
public class CalendarRegisterException extends ApplicationException {

    public CalendarRegisterException() {
        super(ApplicationErrorCode.CALENDAR_REGISTRATION_FAILED);
    }
}
