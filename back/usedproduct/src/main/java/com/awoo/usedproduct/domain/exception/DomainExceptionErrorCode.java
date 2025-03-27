package com.awoo.usedproduct.domain.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum DomainExceptionErrorCode{

    UNAUTHORIZED_MODIFICATION(HttpStatus.FORBIDDEN, "상품 수정 권한이 없습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
