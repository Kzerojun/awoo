package com.awoo.calendar.ui.exception;

public class TimeInvalidFormatException extends UiException {

    public TimeInvalidFormatException(){
        super(UiErrorCode.TIME_INVALID_FORMAT);
    }
}
