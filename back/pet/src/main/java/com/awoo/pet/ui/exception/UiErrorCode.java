package com.awoo.pet.ui.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum UiErrorCode {

    NAME_REQUIRED(HttpStatus.BAD_REQUEST, "이름은 필수 입력값입니다."),
    BREED_REQUIRED(HttpStatus.BAD_REQUEST, "견종은 필수 입력값입니다."),
    AGE_REQUIRED(HttpStatus.BAD_REQUEST, "나이은 필수 입력값입니다."),
    AGE_INVALID_FORMAT(HttpStatus.BAD_REQUEST, "나이는 0이상의 숫자여야 합니다.");


    private final HttpStatus httpStatus;
    private final String message;
}
