package com.awoo.usedproduct.ui.facade.dto.response;

import lombok.Builder;

public record MessageResponse(Integer messageId,
                              String message,
                              Integer chatRoomId,
                              Integer senderId,
                              String image) {

    @Builder
    public MessageResponse{

    }
}
