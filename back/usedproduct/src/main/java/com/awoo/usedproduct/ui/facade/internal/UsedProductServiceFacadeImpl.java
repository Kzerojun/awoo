package com.awoo.usedproduct.ui.facade.internal;

import com.awoo.usedproduct.application.*;
import com.awoo.usedproduct.application.command.*;
import com.awoo.usedproduct.application.query.FetchMySalesQuery;
import com.awoo.usedproduct.application.query.FetchUsedProductQuery;
import com.awoo.usedproduct.domain.UsedProductEntity;
import com.awoo.usedproduct.infra.MemberInfoResponse;
import com.awoo.usedproduct.ui.facade.UsedProductServiceFacade;
import com.awoo.usedproduct.ui.facade.dto.response.*;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsedProductServiceFacadeImpl implements UsedProductServiceFacade {

    private final RegisterUsedProductService registerUsedProductService;
    private final ModifyUsedProductService modifyUsedProductService;
    private final QueryUsedProductsService queryUsedProductsService;
    private final DeleteUsedProductService deleteUsedProductService;
    private final LikeService likeService;
    private final ReportService reportService;
    private final CreateRoomService createRoomService;
    private final ChatMessageService chatMessageService;
    private final ModifyStatusService modifyStatusService;

    @Override
    public RegisterUsedProductResponse registerUsedProduct(RegisterUsedProductCommand command) {
        Integer usedProductId = registerUsedProductService.registerUsedProduct(command);
        return new RegisterUsedProductResponse(usedProductId);
    }

    @Override
    public ReportResponse report(ReportCommand command) {
        Integer reportId = reportService.report(command);
        return new ReportResponse(reportId);
    }

    @Override
    public ModifyUsedProductResponse modifyUsedProduct(ModifyUsedProductCommand command) {
        Integer productId = modifyUsedProductService.modifyUsedProduct(command);
        return new ModifyUsedProductResponse(productId);
    }

    @Override
    public UsedProductsResponse fetchUsedProducts(Pageable pageable) {
        Page<UsedProductEntity> result = queryUsedProductsService.fetchUsedProducts(pageable);
        return UsedProductsResponse.fromPage(result);
    }

    @Override
    public FetchUsedProductDetailResponse fetchUsedProduct(FetchUsedProductQuery query) {
        UsedProductEntity usedProductEntity = queryUsedProductsService.fetchUsedProduct(query);
        boolean liked = queryUsedProductsService.isLiked(query.usedProductId(),query.memberId());
        MemberInfoResponse memberInfoResponse = queryUsedProductsService.fetchMemberInfo(
                usedProductEntity.getMemberId());
        return FetchUsedProductDetailResponse.create(
                usedProductEntity, liked,memberInfoResponse.name(),query.memberId());
    }

    @Override
    public LikeResponse like(LikeCommand command) {
        boolean result = likeService.like(command);
        return new LikeResponse(result);
    }

    @Override
    public DeleteUsedProductResponse delete(DeleteUsedProductCommand command) {
        deleteUsedProductService.deleteUsedProduct(command);
        return new DeleteUsedProductResponse("중고거래 삭제가 성공하였습니다.");
    }

    @Override
    public FetchMySalesResponse fetchMySales(FetchMySalesQuery query) {
        List<UsedProductEntity> usedProductEntities = queryUsedProductsService.fetchMySales(query);
        return FetchMySalesResponse.fromEntity(usedProductEntities);
    }

    @Override
    public CreateRoomResponse createRoom(CreateChatRoomCommand command) {
        Integer chatRoomId = createRoomService.createChatRoom(command);
        return new CreateRoomResponse(chatRoomId);
    }

    @Override
    public FetchMessageResponse message(MessageCommand command) {
        return chatMessageService.saveMessage(command);
    }

    @Override
    public ModifyUsedProductStatusResponse modifyStatus(ModifyUsedProductStatusCommand command) {
        Integer usedProductId = modifyStatusService.modifyStatus(command);
        return new ModifyUsedProductStatusResponse(usedProductId);
    }


    @Override
    public FetchChatRoomsResponse fetchChatRooms(Integer memberId) {
        return queryUsedProductsService.fetchChatRooms(memberId);
    }

    @Override
    public FetchChatMessagesResponse fetchChatMessages(Integer memberId, Integer chatRoomId) {
        return queryUsedProductsService.fetchChatMessages(memberId, chatRoomId);
    }

    @Override
    public SearchUsedProductsResponse searchUsedProducts(String keyword) {
        List<UsedProductEntity> usedProductEntities = queryUsedProductsService.searchUsedProducts(
                keyword);

       return SearchUsedProductsResponse.builder()
                .usedProducts(
                        usedProductEntities.stream()
                                .map(UsedProductResponse::fromEntity)
                                .toList()
                ).build();
    }

    @Override
    public FetchLikeUsedProductsResponse fetchLikeUsedProducts(Integer memberId) {
        List<UsedProductEntity> usedProductEntities = queryUsedProductsService.fetchLikeUsedProducts(memberId);

        return FetchLikeUsedProductsResponse.builder()
                .usedProducts(usedProductEntities.stream()
                        .map(UsedProductResponse::fromEntity)
                        .toList()
                )
                .build();
    }
}
