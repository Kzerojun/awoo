package com.awoo.payment.ui.facade.dto.request;

import com.awoo.payment.application.command.SafePayCommand;

public record SafePayRequest(Integer amount) {

    public SafePayCommand toCommand(String memberId, String idempotencyKey) {
        return SafePayCommand.builder()
                .idempotencyKey(idempotencyKey)
                .memberId(Integer.valueOf(memberId))
                .amount(amount)
                .build();
    }
}
