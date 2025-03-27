package com.awoo.usedproduct.application.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApplicationException extends RuntimeException
{
    private final HttpStatus httpStatus;

    public ApplicationException(ApplicationErrorCode applicationErrorCode) {
        super(applicationErrorCode.getMessage());
        this.httpStatus = applicationErrorCode.getHttpStatus();
    }
}
