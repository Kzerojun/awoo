package com.awoo.payment.ui.facade.dto.request;

import com.awoo.payment.application.command.RegisterPaymentCommand;

public record RegisterPaymentRequest(String password) {

    public RegisterPaymentCommand toCommand(String authToken, String memberId) {
        return RegisterPaymentCommand.builder()
                .authToken(authToken)
                .memberId(Integer.valueOf(memberId))
                .password(password)
                .build();
    }
}
