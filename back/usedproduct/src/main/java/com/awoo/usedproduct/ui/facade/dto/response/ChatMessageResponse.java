package com.awoo.usedproduct.ui.facade.dto.response;

import lombok.Builder;

public record ChatMessageResponse(Integer memberId, String message, String image) {

    @Builder
    public ChatMessageResponse{}
}
