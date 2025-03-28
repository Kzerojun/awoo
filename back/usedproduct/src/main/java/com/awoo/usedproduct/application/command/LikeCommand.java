package com.awoo.usedproduct.application.command;

import lombok.Builder;

public record LikeCommand(Integer memberId, Integer usedProductId) {

    @Builder
    public LikeCommand{

    }
}
