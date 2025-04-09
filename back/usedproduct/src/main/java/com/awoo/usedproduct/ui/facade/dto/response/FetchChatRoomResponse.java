package com.awoo.usedproduct.ui.facade.dto.response;

import java.time.LocalDateTime;

public record FetchChatRoomResponse(Integer chatRoomId,
                                    Integer usedProductId,
                                    String latestMessage,
                                    LocalDateTime latestMessageCreatedAt,
                                    String sellerNickname,
                                    String memberProfileImage,
                                    String name) {
}
