package com.awoo.pet.ui.exception;

public class TimeInvalidFormatException extends UiException{

    public TimeInvalidFormatException() {
        super(UiErrorCode.TIME_INVALID_FORMAT);
    }
}
