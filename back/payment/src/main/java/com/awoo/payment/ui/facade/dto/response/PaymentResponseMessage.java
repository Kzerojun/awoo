package com.awoo.payment.ui.facade.dto.response;


import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum PaymentResponseMessage {

    REGISTER_PAYMENT_PASSWORD("성공적으로 비밀번호가 등록되었습니다.");

    private final String message;

    @JsonValue
    public String getMessage() {
        return message;
    }
}
