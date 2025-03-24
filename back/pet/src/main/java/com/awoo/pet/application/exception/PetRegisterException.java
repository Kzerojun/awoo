package com.awoo.pet.application.exception;

import lombok.Getter;

@Getter
public class PetRegisterException extends ApplicationException {

    private final ApplicationErrorCode applicationErrorCode;

    public PetRegisterException(ApplicationErrorCode applicationErrorCode) {
        super(applicationErrorCode);
        this.applicationErrorCode = applicationErrorCode;
    }
}
