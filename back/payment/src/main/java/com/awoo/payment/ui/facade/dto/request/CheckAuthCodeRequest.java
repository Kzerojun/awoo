package com.awoo.payment.ui.facade.dto.request;

import com.awoo.payment.application.command.CheckAuthCodeCommand;
import com.awoo.payment.ui.exception.AuthCodeRequiredException;
import com.awoo.payment.ui.exception.PhoneRequiredException;

public record CheckAuthCodeRequest(String phone, String authCode) {

    public CheckAuthCodeCommand toCommand(String memberId) {
        validate();
        return CheckAuthCodeCommand.builder()
                .phone(phone)
                .authCode(authCode)
                .memberId(Integer.valueOf(memberId))
                .build();
    }

    private void validate() {
        if (phone.isBlank()) {
            throw new PhoneRequiredException();
        }

        if(authCode.isBlank()) {
            throw new AuthCodeRequiredException();
        }
    }
}
