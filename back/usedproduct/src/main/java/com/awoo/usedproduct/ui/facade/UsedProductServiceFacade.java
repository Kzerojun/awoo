package com.awoo.usedproduct.ui.facade;

import com.awoo.usedproduct.application.command.*;
import com.awoo.usedproduct.application.query.FetchMySalesQuery;
import com.awoo.usedproduct.application.query.FetchUsedProductQuery;
import com.awoo.usedproduct.ui.facade.dto.response.*;
import org.springframework.data.domain.Pageable;

public interface UsedProductServiceFacade {

    RegisterUsedProductResponse registerUsedProduct(RegisterUsedProductCommand command);

    ModifyUsedProductResponse modifyUsedProduct(ModifyUsedProductCommand command);

    UsedProductsResponse fetchUsedProducts(Pageable pageable);


    FetchUsedProductDetailResponse fetchUsedProduct(FetchUsedProductQuery query);

    FetchMySalesResponse fetchMySales(FetchMySalesQuery query);

    LikeResponse like(LikeCommand command);

    DeleteUsedProductResponse delete(DeleteUsedProductCommand command);

    ReportResponse report(ReportCommand command);

    CreateRoomResponse createRoom(CreateChatRoomCommand command);

    FetchMessageResponse message(MessageCommand command);

    ModifyUsedProductStatusResponse modifyStatus(ModifyUsedProductStatusCommand command);

    FetchChatRoomsResponse fetchChatRooms(Integer memberId);

    FetchChatMessagesResponse fetchChatMessages(Integer memberId, Integer chatRoomId);

    SearchUsedProductsResponse searchUsedProducts(String keyword);

    FetchLikeUsedProductsResponse fetchLikeUsedProducts(Integer memberId);
}
