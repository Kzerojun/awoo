package com.awoo.gateway.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // 인증 관련
    ACCESS_DENIED(HttpStatus.FORBIDDEN, "A001", "접근 권한이 없습니다."),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "A002", "토큰이 만료되었습니다."),
    INVALID_TOKEN(HttpStatus.BAD_REQUEST, "A003", "토큰이 유효하지 않습니다."),
    AUTHENTICATION_FAILED(HttpStatus.UNAUTHORIZED, "A004", "인증에 실패하였습니다."),
    INVALID_PASSWORD(HttpStatus.UNAUTHORIZED, "A005", "비밀번호가 일치하지 않습니다."),
    MISSING_REFRESH_TOKEN(HttpStatus.BAD_REQUEST, "A006", "Refresh Token이 존재하지 않습니다."),
    INVALID_TOKEN_SIGNATURE(HttpStatus.UNAUTHORIZED, "A007", "잘못된 JWT 서명입니다."),
    UNSUPPORTED_TOKEN(HttpStatus.BAD_REQUEST, "A008", "지원되지 않는 JWT 토큰입니다."),
    INVALID_TOKEN_FORMAT(HttpStatus.BAD_REQUEST, "A009", "JWT 토큰 형식이 잘못되었습니다.");


    private final HttpStatus status;
    private final String code;
    private final String message;

}
