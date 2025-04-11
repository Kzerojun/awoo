package com.awoo.calendar.ui.exception;

public class ColorRequiredException extends UiException{

    public ColorRequiredException(){
        super(UiErrorCode.COLOR_REQUIRED);
    }
}
