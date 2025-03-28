package com.awoo.usedproduct.application.command;

import lombok.Builder;

public record DeleteUsedProductCommand(Integer memberId, Integer userProductId) {

    @Builder
    public DeleteUsedProductCommand {

    }
}
