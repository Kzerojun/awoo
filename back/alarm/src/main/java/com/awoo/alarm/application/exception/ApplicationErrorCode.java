package com.awoo.alarm.application.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ApplicationErrorCode {

    MAKE_MESSAGE_FAILED(HttpStatus.BAD_REQUEST, "메세지 생성에 실패하였습니다."),
    FCM_ACCESS_TOKEN_NOT_FOUND(HttpStatus.NOT_FOUND, "Fcm Access token을 찾지 못했습니다."),
    ALARM_REGISTRATION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "알람 등록에 실패하였습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}

