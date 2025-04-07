package com.awoo.usedproduct.ui.facade.dto.request;

import com.awoo.usedproduct.application.command.MessageCommand;

public record MessageRequest(String message, String image) {

    public MessageCommand toCommand(String senderId,Integer chatRoomId) {
        return MessageCommand.builder()
                .message(message)
                .image(image)
                .chatRoomId(chatRoomId)
                .senderId(Integer.valueOf(senderId))
                .build();
    }
}

