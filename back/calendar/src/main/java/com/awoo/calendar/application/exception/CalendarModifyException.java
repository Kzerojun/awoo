package com.awoo.calendar.application.exception;

public class CalendarModifyException extends ApplicationException {

    public CalendarModifyException() {
        super(ApplicationErrorCode.CALENDAR_MODIFY_FAILED);
    }
}
