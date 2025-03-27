package com.awoo.usedproduct.domain.exception;

public class UnauthorizedModificationException extends DomainException{

    public UnauthorizedModificationException(DomainExceptionErrorCode domainErrorCode) {
        super(domainErrorCode);
    }
}
