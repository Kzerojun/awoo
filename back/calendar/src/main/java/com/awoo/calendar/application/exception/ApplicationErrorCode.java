package com.awoo.calendar.application.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ApplicationErrorCode {

    PET_NOT_FOUND(HttpStatus.NOT_FOUND, "반려견 조회에 실패했습니다."),
    CALENDAR_REGISTRATION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "일정 등록에 실패하였습니다."),
    CALENDAR_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 일정을 조회하는데 실패했습니다."),
    ACCESS_DENIED(HttpStatus.UNAUTHORIZED, "접근 권한이 없습니다."),
    CALENDAR_MODIFY_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "일정 수정에 실패하였습니다."),
    CALENDAR_DELETE_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "일정 삭제에 실패하였습니다.")
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
