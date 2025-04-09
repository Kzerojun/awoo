package com.awoo.usedproduct.ui.facade.dto.response;

import lombok.Builder;

import java.time.LocalDateTime;

public record FetchMessageResponse(Integer messageId,
                                   String message,
                                   Integer chatRoomId,
                                   Integer senderId,
                                   String image,
                                   LocalDateTime createdAt,
                                   String name,
                                   String memberProfileImage) {

    @Builder
    public FetchMessageResponse {

    }
}
