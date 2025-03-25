package com.awoo.pet.application.exception;

import lombok.Getter;

@Getter
public class PetNotFoundException extends ApplicationException{

    private final ApplicationErrorCode applicationErrorCode;

    public PetNotFoundException(ApplicationErrorCode applicationErrorCode) {
        super(applicationErrorCode);
        this.applicationErrorCode = applicationErrorCode;
    }
}
