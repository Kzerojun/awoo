package com.awoo.pet.application.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ApplicationErrorCode {

    PET_REGISTRATION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "반려견 등록에 실패하였습니다."),
    PET_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 반려견을 찾을 수 없습니다."),
    PET_MODIFY_FAILED(HttpStatus.NOT_MODIFIED, "반려견 정보 수정에 실패하였습니다."),
    WALk_REGISTRATION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "산책 등록에 실패하였습니다."),
    WALK_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 산책을 찾을 수 없습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
