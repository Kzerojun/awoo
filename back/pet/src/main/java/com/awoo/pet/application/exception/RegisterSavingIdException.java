package com.awoo.pet.application.exception;

import lombok.Getter;

@Getter
public class RegisterSavingIdException extends ApplicationException{

    private final ApplicationErrorCode applicationErrorCode;

    public RegisterSavingIdException(ApplicationErrorCode applicationErrorCode) {
        super(applicationErrorCode);
        this.applicationErrorCode = applicationErrorCode;
    }
}
