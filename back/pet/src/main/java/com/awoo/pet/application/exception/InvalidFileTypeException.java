package com.awoo.pet.application.exception;

import lombok.Getter;

@Getter
public class InvalidFileTypeException extends ApplicationException {

    private final ApplicationErrorCode applicationErrorCode;

    public InvalidFileTypeException(ApplicationErrorCode applicationErrorCode) {
        super(applicationErrorCode);
        this.applicationErrorCode = applicationErrorCode;
    }
}
