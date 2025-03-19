package com.awoo.payment.application.command;

import lombok.Builder;

public record RegisterPaymentCommand(Integer memberId, String password) {

    @Builder
    public RegisterPaymentCommand {}
}
