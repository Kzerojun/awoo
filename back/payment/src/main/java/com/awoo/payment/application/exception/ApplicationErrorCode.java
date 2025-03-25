package com.awoo.payment.application.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ApplicationErrorCode {

    PAYMENT_ALREADY_REGISTERED(HttpStatus.CONFLICT, "이미 등록된 사용자입니다."),
    PAYMENT_NOT_FOUND(HttpStatus.NOT_FOUND,"해당 페이 계좌를 찾을 수 없습니다."),
    MEMBER_MISS_MATCH(HttpStatus.BAD_REQUEST, "멤버 정보가 유효하지 않습니다."),
    AUTH_CODE_MISMATCH(HttpStatus.UNAUTHORIZED, "인증 코드가 일치하지 않습니다"),
    AUTH_TOKEN_MISMATCH(HttpStatus.UNAUTHORIZED, "인증 토큰이 일치하지 않습니다");


    private final HttpStatus httpStatus;
    private final String message;
}
