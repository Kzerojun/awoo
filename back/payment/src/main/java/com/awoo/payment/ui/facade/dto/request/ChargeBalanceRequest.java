package com.awoo.payment.ui.facade.dto.request;

import com.awoo.payment.application.command.ChargeBalanceCommand;

import java.math.BigDecimal;

public record ChargeBalanceRequest(BigDecimal amount) {

    public ChargeBalanceCommand toCommand(String idempotencyKey, Integer memberId) {
        return ChargeBalanceCommand.builder()
                .amount(amount)
                .idempotencyKey(idempotencyKey)
                .memberId(memberId)
                .build();
    }
}
