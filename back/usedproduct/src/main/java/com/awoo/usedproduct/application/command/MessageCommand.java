package com.awoo.usedproduct.application.command;

import lombok.Builder;

public record MessageCommand(Integer senderId, String message, String image, Integer chatRoomId) {

    @Builder
    public MessageCommand {

    }

}
