package com.awoo.pet.application.exception;

import lombok.Getter;

@Getter
public class OcrImageRequiredException extends ApplicationException{

    private final ApplicationErrorCode applicationErrorCode;

    public OcrImageRequiredException(ApplicationErrorCode applicationErrorCode) {
        super(applicationErrorCode);
        this.applicationErrorCode = applicationErrorCode;
    }
}
