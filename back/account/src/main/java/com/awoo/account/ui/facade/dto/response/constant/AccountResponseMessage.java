package com.awoo.account.ui.facade.dto.response.constant;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum AccountResponseMessage {

    DEDUCT_BALANCE_SUCCESS("성공적으로 잔액이 차감되었습니다.");

    private final String message;

    @JsonValue
    public String getMessage() {
        return message;
    }
}
