package com.awoo.payment.application.command;

import lombok.Builder;

public record RegisterPaymentCommand(Integer memberId,String authToken, String password) {

    @Builder
    public RegisterPaymentCommand {}
}
