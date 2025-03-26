package com.awoo.calendar.ui.exception;

public class StartTimeRequiredException extends UiException{

    public StartTimeRequiredException(){
        super(UiErrorCode.START_TIME_REQUIRED);
    }
}
