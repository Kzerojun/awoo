package com.awoo.usedproduct.application.exception;

public class LikeException extends ApplicationException {
    public LikeException(ApplicationErrorCode applicationErrorCode) {
        super(applicationErrorCode);
    }
}
