package com.awoo.payment.application.command;

import lombok.Builder;

public record RegisterPaymentPasswordCommand(String password, Integer memberId) {

    @Builder
    public RegisterPaymentPasswordCommand{
    }
}
