package com.awoo.payment.application.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ApplicationErrorCode {

    PAYMENT_ALREADY_REGISTERED(HttpStatus.CONFLICT, "이미 등록된 사용자입니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
