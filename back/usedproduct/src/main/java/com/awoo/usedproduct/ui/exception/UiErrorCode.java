package com.awoo.usedproduct.ui.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum UiErrorCode {

    // 새로 추가된 코드들 - UsedProduct 관련
    TITLE_REQUIRED(HttpStatus.BAD_REQUEST, "제목은 필수입니다."),
    CONTENT_REQUIRED(HttpStatus.BAD_REQUEST, "내용은 필수입니다."),
    PRICE_REQUIRED(HttpStatus.BAD_REQUEST, "가격은 필수입니다."),
    PRICE_INVALID(HttpStatus.BAD_REQUEST, "가격은 0보다 커야 합니다."),
    PRODUCT_ID_INVALID(HttpStatus.BAD_REQUEST, "잘못된 상품 ID입니다.");

    private final HttpStatus httpStatus;
    private final String message;
}