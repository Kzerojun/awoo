package com.awoo.calendar.application.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ApplicationErrorCode {

    CALENDAR_REGISTRATION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "일정 등록에 실패하였습니다."),
    CALENDAR_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 산책을 조회하는데 실패했습니다.")
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
