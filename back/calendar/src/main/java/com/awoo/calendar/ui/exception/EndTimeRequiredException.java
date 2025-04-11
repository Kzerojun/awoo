package com.awoo.calendar.ui.exception;

public class EndTimeRequiredException extends UiException {

    public EndTimeRequiredException(){
        super(UiErrorCode.END_TIME_REQUIRED);
    }
}
