package com.awoo.account.application.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class AccountApplicationException extends RuntimeException{

    private final HttpStatus httpStatus;

    public AccountApplicationException(final AccountApplicationErrorCode errorCode) {
        super(errorCode.getMessage());
        this.httpStatus = errorCode.getHttpStatus();
    }
}
