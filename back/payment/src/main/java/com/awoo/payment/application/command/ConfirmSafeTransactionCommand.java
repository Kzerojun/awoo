package com.awoo.payment.application.command;

import lombok.Builder;

public record ConfirmSafeTransactionCommand(Integer buyerId, Integer sellerId, Integer price, Integer usedProductId) {

    @Builder
    public ConfirmSafeTransactionCommand {

    }
}
