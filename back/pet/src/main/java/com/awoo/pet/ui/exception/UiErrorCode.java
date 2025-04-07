package com.awoo.pet.ui.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum UiErrorCode {

    NAME_REQUIRED(HttpStatus.BAD_REQUEST, "이름은 필수 입력값입니다."),
    BREED_REQUIRED(HttpStatus.BAD_REQUEST, "견종은 필수 입력값입니다."),
    AGE_REQUIRED(HttpStatus.BAD_REQUEST, "올바른 나이 값을 입력해주세요."),
    ANIMAL_REQ_NUMBER_REQUIRED(HttpStatus.BAD_REQUEST, "동물등록번호는 필수 입력값입니다."),
    OCR_URL_REQUIRED(HttpStatus.BAD_REQUEST, "ocrImageUrl은 필수 입력값입니다."),
    START_TIME_REQUIRED(HttpStatus.BAD_REQUEST, "시작 시간은 필수 입력값입니다.."),
    END_TIME_REQUIRED(HttpStatus.BAD_REQUEST, "종료 시간은 필수  입력값입니다."),
    TIME_INVALID_FORMAT(HttpStatus.BAD_REQUEST, "올바르지 못한 시간 형식입니다."),
    DISTANCE_INVALID_FORMAT(HttpStatus.BAD_REQUEST, "올바른 거리 값을 입력해주세요."),
    ;


    private final HttpStatus httpStatus;
    private final String message;
}
