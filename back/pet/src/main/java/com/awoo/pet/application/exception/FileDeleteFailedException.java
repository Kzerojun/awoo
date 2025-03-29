package com.awoo.pet.application.exception;

import lombok.Getter;

@Getter
public class FileDeleteFailedException extends ApplicationException{

    private final ApplicationErrorCode applicationErrorCode;

    public FileDeleteFailedException(ApplicationErrorCode applicationErrorCode) {
        super(applicationErrorCode);
        this.applicationErrorCode = applicationErrorCode;
    }
}
