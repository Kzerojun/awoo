package com.awoo.pet.application.exception;

import lombok.Getter;

@Getter
public class FileModifyFailedException extends ApplicationException{

    private final ApplicationErrorCode applicationErrorCode;

    public FileModifyFailedException(ApplicationErrorCode applicationErrorCode) {
        super(applicationErrorCode);
        this.applicationErrorCode = applicationErrorCode;
    }

}
