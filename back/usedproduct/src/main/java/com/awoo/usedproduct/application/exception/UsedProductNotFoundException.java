package com.awoo.usedproduct.application.exception;

public class UsedProductNotFoundException extends ApplicationException {
    public UsedProductNotFoundException(ApplicationErrorCode applicationErrorCode) {
        super(applicationErrorCode);
    }
}
