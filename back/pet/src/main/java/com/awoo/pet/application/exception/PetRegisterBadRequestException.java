package com.awoo.pet.application.exception;

import lombok.Getter;

@Getter
public class PetRegisterBadRequestException extends ApplicationException {

    private final ApplicationErrorCode applicationErrorCode;

    public PetRegisterBadRequestException(ApplicationErrorCode applicationErrorCode) {
        super(applicationErrorCode);
        this.applicationErrorCode = applicationErrorCode;
    }
}
