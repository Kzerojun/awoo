package com.awoo.pet.application.exception;

import lombok.Getter;

@Getter
public class TextExtractionException extends ApplicationException{

    private final ApplicationErrorCode applicationErrorCode;

    public TextExtractionException(ApplicationErrorCode applicationErrorCode) {
        super(applicationErrorCode);
        this.applicationErrorCode = applicationErrorCode;
    }
}
