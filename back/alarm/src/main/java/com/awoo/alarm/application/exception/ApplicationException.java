package com.awoo.alarm.application.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApplicationException extends RuntimeException {

    private final HttpStatus httpStatus;

    public ApplicationException(final ApplicationErrorCode errorCode) {
        super(errorCode.getMessage());
        this.httpStatus = errorCode.getHttpStatus();
    }
}

