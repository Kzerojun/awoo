package com.awoo.account.application.exception;

public class InsufficientBalanceException extends AccountApplicationException {
    public InsufficientBalanceException() {
        super(AccountApplicationErrorCode.INSUFFICIENT_BALANCE);
    }
}
