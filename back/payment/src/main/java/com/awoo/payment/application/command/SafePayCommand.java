package com.awoo.payment.application.command;

import lombok.Builder;

public record SafePayCommand(Integer memberId, String idempotencyKey, Integer amount) {

    @Builder
    public SafePayCommand{

    }
}
