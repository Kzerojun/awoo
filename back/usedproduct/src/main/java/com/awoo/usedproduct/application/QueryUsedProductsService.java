package com.awoo.usedproduct.application;

import com.awoo.usedproduct.application.query.FetchMySalesQuery;
import com.awoo.usedproduct.application.query.FetchUsedProductQuery;
import com.awoo.usedproduct.domain.ChatRoomEntity;
import com.awoo.usedproduct.domain.UsedProductEntity;
import java.util.List;

import com.awoo.usedproduct.ui.facade.dto.response.FetchChatMessagesResponse;
import com.awoo.usedproduct.ui.facade.dto.response.FetchChatRoomsResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface QueryUsedProductsService {

    Page<UsedProductEntity> fetchUsedProducts(Pageable pageable);

    UsedProductEntity fetchUsedProduct(FetchUsedProductQuery query);

    List<UsedProductEntity> fetchMySales(FetchMySalesQuery query);

    boolean isLiked(Integer usedProductId, Integer memberId);

    FetchChatRoomsResponse fetchChatRooms(Integer memberId);

    FetchChatMessagesResponse fetchChatMessages(Integer memberId, Integer chatRoomId);

    List<UsedProductEntity> searchUsedProducts(String keyword);

    List<UsedProductEntity> fetchLikeUsedProducts(Integer memberId);

}
