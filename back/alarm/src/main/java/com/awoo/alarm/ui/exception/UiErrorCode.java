package com.awoo.alarm.ui.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum UiErrorCode {

    INVALID_FORMAT(HttpStatus.BAD_REQUEST, "올바른 값을 입력해주세요."),
    ;


    private final HttpStatus httpStatus;
    private final String message;
}
