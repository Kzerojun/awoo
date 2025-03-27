package com.awoo.calendar.application.exception;

public class CalendarDeleteException extends ApplicationException{

    public CalendarDeleteException(){
        super(ApplicationErrorCode.CALENDAR_DELETE_FAILED);
    }
}
