package com.awoo.payment.application.command;

import lombok.Builder;

import java.math.BigDecimal;

public record ChargeBalanceCommand(String idempotencyKey, Integer memberId, BigDecimal amount) {

    @Builder
    public ChargeBalanceCommand {}
}
