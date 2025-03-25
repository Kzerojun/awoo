package com.awoo.payment.ui.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum UiErrorCode {

    PASSWORD_REQUIRED(HttpStatus.BAD_REQUEST, "비밀번호는 필수입니다."),
    PASSWORD_INVALID_FORMAT(HttpStatus.BAD_REQUEST, "비밀번호는 6자리 숫자여야 합니다."),
    MEMBER_ID_INVALID(HttpStatus.BAD_REQUEST, "잘못된 회원 ID입니다."),
    AMOUNT_INVALID(HttpStatus.BAD_REQUEST, "금액은 0보다 커야 합니다."),
    IDEMPOTENCY_KEY_REQUIRED(HttpStatus.BAD_REQUEST, "멱등성키는 필수입니다."),
    NAME_REQUIRED(HttpStatus.BAD_REQUEST, "휴대폰 인증에 이름은 필수입니다."),
    PHONE_REQUIRED(HttpStatus.BAD_REQUEST, "휴대폰 인증에 핸드폰 번호는 필수입니다.");

    private final HttpStatus httpStatus;
    private final String message;
}