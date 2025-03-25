package com.awoo.payment.application.exception;

import lombok.Getter;

@Getter
public class MemberMismatchException extends ApplicationException {

  private final ApplicationErrorCode applicationErrorCode;

    public MemberMismatchException(ApplicationErrorCode applicationErrorCode) {
        super(applicationErrorCode);
        this.applicationErrorCode = applicationErrorCode;
    }
}
