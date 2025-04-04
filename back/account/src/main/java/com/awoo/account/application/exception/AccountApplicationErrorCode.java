package com.awoo.account.application.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum AccountApplicationErrorCode {

    ACCOUNT_NOT_FOUND(HttpStatus.BAD_REQUEST, "계좌를 찾을 수 없습니다."),
    INSUFFICIENT_BALANCE(HttpStatus.BAD_REQUEST,"계좌 잔액이 충분하지 않습니다."),
    CONDITION_FALSE(HttpStatus.BAD_REQUEST, "약관 미동의");


    private final HttpStatus httpStatus;
    private final String message;

    private AccountApplicationErrorCode(HttpStatus status, String message) {
        this.httpStatus = status;
        this.message = message;
    }
}
