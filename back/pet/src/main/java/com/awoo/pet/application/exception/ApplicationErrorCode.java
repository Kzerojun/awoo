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
    INVALID_FILE_TYPE(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일 입니다."),
    FILE_UPLOAD_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다."),
    PET_PROFILE_MODIFY_FAILED(HttpStatus.NOT_MODIFIED, "반려견 프로필 수정에 실패하였습니다."),
    FILE_DELETE_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "파일 삭제에 실패하였습니다."),
    SAVING_ID_REGISTER_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "적금 계좌 등록에 실패하였습니다."),
    TEXT_EXTRACTION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "텍스트 추출에 실패하였습니다."),
    OCR_IMAGE_REQUIRED(HttpStatus.BAD_REQUEST, "동물등록증이 필요합니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
