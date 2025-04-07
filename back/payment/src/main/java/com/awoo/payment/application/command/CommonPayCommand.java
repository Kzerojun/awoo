package com.awoo.payment.application.command;

import lombok.Builder;

public record CommonPayCommand(Integer memberId, Integer usedProductId) {

    @Builder
    public CommonPayCommand(Integer memberId, Integer usedProductId) {
        this.memberId = memberId;
        this.usedProductId = usedProductId;
    }
}
