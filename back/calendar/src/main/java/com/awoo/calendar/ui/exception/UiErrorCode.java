package com.awoo.calendar.ui.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum UiErrorCode {

    PET_ID_REQUIRED(HttpStatus.BAD_REQUEST, "반려견 ID는 필수 입력값입니다."),
    SCHEDULE_CONTENT_REQUIRED(HttpStatus.BAD_REQUEST, "일정 내용은 필수 입력 값입니다."),
    START_TIME_REQUIRED(HttpStatus.BAD_REQUEST, "시작 시간은 필수 입력값입니다."),
    END_TIME_REQUIRED(HttpStatus.BAD_REQUEST, "종료 시간은 필수 입력값입니다."),
    TIME_INVALID_FORMAT(HttpStatus.BAD_REQUEST, "올바르지 못한 시간 형식입니다."),
    COLOR_REQUIRED(HttpStatus.BAD_REQUEST, "색상은 필수 입력값입니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
