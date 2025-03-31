package com.awoo.usedproduct.domain;

import java.util.Optional;

public interface ChatRoomRepository {

    ChatRoomEntity save(ChatRoomEntity chatRoom);

    Optional<ChatRoomEntity> findBySellerIdAndBuyerIdAndUsedProductId(Integer sellerId, Integer buyerId, Integer usedProductId);
}
