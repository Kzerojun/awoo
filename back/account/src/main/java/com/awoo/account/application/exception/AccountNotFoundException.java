package com.awoo.account.application.exception;

public class AccountNotFoundException extends AccountApplicationException {
    public AccountNotFoundException() {
        super(AccountApplicationErrorCode.ACCOUNT_NOT_FOUND);
    }
}
