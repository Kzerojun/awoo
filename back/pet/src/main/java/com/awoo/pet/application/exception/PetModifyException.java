package com.awoo.pet.application.exception;

import lombok.Getter;

@Getter
public class PetModifyException extends ApplicationException {

    private final ApplicationErrorCode applicationErrorCode;

    public PetModifyException(ApplicationErrorCode applicationErrorCode) {
        super(applicationErrorCode);
        this.applicationErrorCode = applicationErrorCode;
    }

}
