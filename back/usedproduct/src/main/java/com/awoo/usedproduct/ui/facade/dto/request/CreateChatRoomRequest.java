package com.awoo.usedproduct.ui.facade.dto.request;

import com.awoo.usedproduct.application.command.CreateChatRoomCommand;

public record CreateChatRoomRequest(Integer usedProductId) {

    public CreateChatRoomCommand toCommand(String buyerId) {
        return CreateChatRoomCommand.builder()
                .buyerId(Integer.valueOf(buyerId))
                .usedProductId(usedProductId)
                .build();
    }
}
