package com.awoo.pet.application.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ApplicationErrorCode {

    PET_INVALID_DATA(HttpStatus.BAD_REQUEST, "반려견 등록에 유효하지 않은 데이터 형식입니다."),
    PET_REGISTRATION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "반려견 등록에 실패하였습니다.")
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
