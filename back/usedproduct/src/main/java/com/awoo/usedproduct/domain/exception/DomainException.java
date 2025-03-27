package com.awoo.usedproduct.domain.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class DomainException extends RuntimeException
{
    private final HttpStatus httpStatus;

    public DomainException(DomainExceptionErrorCode domainErrorCode) {
        super(domainErrorCode.getMessage());
        this.httpStatus = domainErrorCode.getHttpStatus();
    }
}