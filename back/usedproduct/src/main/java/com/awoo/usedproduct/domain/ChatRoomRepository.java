package com.awoo.usedproduct.domain;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository {

    ChatRoomEntity save(ChatRoomEntity chatRoom);

    Optional<ChatRoomEntity> findBySellerIdAndBuyerIdAndUsedProductId(Integer sellerId, Integer buyerId, Integer usedProductId);

    List<ChatRoomEntity> findBySellerIdOrBuyerId(Integer sellerId, Integer buyerId);
}
