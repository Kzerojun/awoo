package com.awoo.payment.ui.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum UiErrorCode {

    PASSWORD_REQUIRED(HttpStatus.BAD_REQUEST, "비밀번호는 필수입니다."),
    PASSWORD_INVALID_FORMAT(HttpStatus.BAD_REQUEST, "비밀번호는 6자리 숫자여야 합니다.");

    private final HttpStatus httpStatus;
    private final String message;
}