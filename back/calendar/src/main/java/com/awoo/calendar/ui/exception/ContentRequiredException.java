package com.awoo.calendar.ui.exception;

public class ContentRequiredException extends UiException{

    public ContentRequiredException(){
        super(UiErrorCode.SCHEDULE_CONTENT_REQUIRED);
    }
}
