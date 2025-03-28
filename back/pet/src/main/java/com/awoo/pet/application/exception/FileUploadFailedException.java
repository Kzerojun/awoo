package com.awoo.pet.application.exception;

import lombok.Getter;

@Getter
public class FileUploadFailedException extends ApplicationException {

    private final ApplicationErrorCode applicationErrorCode;

    public FileUploadFailedException(ApplicationErrorCode applicationErrorCode) {
        super(applicationErrorCode);
        this.applicationErrorCode = applicationErrorCode;
    }

}
