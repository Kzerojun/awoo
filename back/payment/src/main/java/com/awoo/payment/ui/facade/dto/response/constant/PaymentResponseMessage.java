package com.awoo.payment.ui.facade.dto.response.constant;


import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum PaymentResponseMessage {

    REGISTER_PAYMENT_PASSWORD("성공적으로 비밀번호가 등록되었습니다."),
    CHARGE_PAYMENT_FAIL("페이서비스 잔액 충전에 실패하였습니다."),
    CHARGE_PAYMENT_SUCCESS("페이서비스 잔액 충전에 성공하셨습니다."),
    SEND_AUTH_PHONE_MESSAGE_SUCCESS("핸드폰 인증 요청에 성공하셨습니다."),
    CHECK_AUTH_SUCCESS("핸드폰 인증에 성공하셨습니다.");

    private final String message;

    @JsonValue
    public String getMessage() {
        return message;
    }
}
