package com.awoo.usedproduct.application.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ApplicationErrorCode {

    PRODUCT_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 ID의 상품을 찾을 수 없습니다."),
    MODIFY_FAILED(HttpStatus.FORBIDDEN, "중고 거래 수정 기능이 실패하였습니다."),
    LIKE_FAILED(HttpStatus.BAD_REQUEST, "이미 좋아요를 눌렀습니다."),;


    private final HttpStatus httpStatus;
    private final String message;
}