package com.awoo.usedproduct.ui.facade.dto.response;

import java.util.List;

public record FetchChatMessagesResponse(List<FetchMessageResponse> chatMessages) {
}
