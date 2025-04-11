package com.awoo.pet.application.exception;

import lombok.Getter;

@Getter
public class WalkNotFondException extends ApplicationException {

    private final ApplicationErrorCode applicationErrorCode;

    public WalkNotFondException(ApplicationErrorCode applicationErrorCode) {
        super(applicationErrorCode);
        this.applicationErrorCode = applicationErrorCode;
    }
}
