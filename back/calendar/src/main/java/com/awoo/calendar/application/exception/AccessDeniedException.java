package com.awoo.calendar.application.exception;

public class AccessDeniedException extends ApplicationException{
    public AccessDeniedException(){
        super(ApplicationErrorCode.ACCESS_DENIED);
    }
}
