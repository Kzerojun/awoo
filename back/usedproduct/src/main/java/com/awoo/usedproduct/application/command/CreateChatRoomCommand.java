package com.awoo.usedproduct.application.command;

import lombok.Builder;

public record CreateChatRoomCommand(Integer buyerId, Integer usedProductId) {

    @Builder
    public CreateChatRoomCommand {

    }
}
