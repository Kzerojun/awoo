package com.awoo.usedproduct.ui.web;

import com.awoo.usedproduct.application.command.*;
import com.awoo.usedproduct.application.query.FetchMySalesQuery;
import com.awoo.usedproduct.application.query.FetchUsedProductQuery;
import com.awoo.usedproduct.domain.UsedProductStatus;
import com.awoo.usedproduct.support.ApiUtils;
import com.awoo.usedproduct.ui.facade.UsedProductServiceFacade;
import com.awoo.usedproduct.ui.facade.dto.request.*;
import com.awoo.usedproduct.ui.facade.dto.response.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/used-products")
@Slf4j
public class UsedProductController {

    private final UsedProductServiceFacade usedProductServiceFacade;
    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping
    public ApiUtils.ApiResult<RegisterUsedProductResponse> registerUsedProduct(@RequestPart RegisterUsedProductRequest request,
                                                                               @RequestPart List<MultipartFile> images,
                                                                               @RequestHeader("X-User-Id") String userId) {
        RegisterUsedProductCommand command = request.toCommand(userId, images);
        RegisterUsedProductResponse response = usedProductServiceFacade.registerUsedProduct(command);
        return ApiUtils.success(response);
    }

    @PutMapping("/{usedProductId}")
    public ApiUtils.ApiResult<ModifyUsedProductResponse> modifyUsedProduct(@RequestPart ModifyUsedProductRequest request,
                                                                           @RequestPart List<MultipartFile> images,
                                                                           @RequestHeader("X-User-Id") String userId,
                                                                           @PathVariable Integer usedProductId) {
        ModifyUsedProductCommand command = request.toCommand(userId, usedProductId, images);
        ModifyUsedProductResponse response = usedProductServiceFacade.modifyUsedProduct(command);
        return ApiUtils.success(response);
    }

    @GetMapping
    public ApiUtils.ApiResult<UsedProductsResponse> fetchUsedProducts(@PageableDefault(size = 20, sort = "usedProductId", direction = Sort.Direction.DESC) Pageable pageable) {

        UsedProductsResponse response = usedProductServiceFacade.fetchUsedProducts(pageable);
        return ApiUtils.success(response);
    }

    @PostMapping("/{usedProductId}/likes")
    public ApiUtils.ApiResult<LikeResponse> like(@RequestHeader("X-User-Id") String memberId,
                                     @PathVariable(name = "usedProductId") Integer usedProductId) {
        LikeCommand command = LikeCommand.builder()
                .usedProductId(usedProductId)
                .memberId(Integer.valueOf(memberId))
                .build();

        LikeResponse response = usedProductServiceFacade.like(command);
        return ApiUtils.success(response);
    }

    @DeleteMapping("/{usedProductId}")
    public ApiUtils.ApiResult<DeleteUsedProductResponse> deleteUsedProduct(
            @PathVariable(name = "usedProductId") Integer usedProductId,
                                                  @RequestHeader("X-User-Id") String memberId){
        DeleteUsedProductCommand command = DeleteUsedProductCommand.builder()
                .userProductId(usedProductId)
                .memberId(Integer.valueOf(memberId))
                .build();

        DeleteUsedProductResponse response = usedProductServiceFacade.delete(command);
        return ApiUtils.success(response);
    }
    @GetMapping("/{usedProductId}")
    public ApiUtils.ApiResult<FetchUsedProductDetailResponse> fetchUsedProduct(
            @PathVariable(name = "usedProductId") Integer usedProductId,
            @RequestHeader(value = "X-User-Id", required = false) String memberId) {
        Integer memberIdInt = (memberId != null) ? Integer.valueOf(memberId) : null;

        FetchUsedProductQuery query = FetchUsedProductQuery.builder()
                .usedProductId(usedProductId)
                .memberId(memberIdInt)
                .build();
        FetchUsedProductDetailResponse response = usedProductServiceFacade.fetchUsedProduct(query);
        return ApiUtils.success(response);
    }

    @PostMapping("/{usedProductId}/reports")
    public ApiUtils.ApiResult<ReportResponse> report(@PathVariable(name = "usedProductId") Integer usedProductId,
            @RequestBody ReportUsedProductRequest request) {

        ReportCommand command = request.toCommand(usedProductId);
        ReportResponse response = usedProductServiceFacade.report(command);
        return ApiUtils.success(response);
    }

    @GetMapping("/my-sales")
    public ApiUtils.ApiResult<FetchMySalesResponse> fetchMySales(@RequestHeader("X-User-Id") String memberId,
            @RequestParam(name="status") List<UsedProductStatus> status) {
        FetchMySalesQuery query = FetchMySalesQuery.builder()
                .status(status)
                .memberId(Integer.valueOf(memberId))
                .build();
        FetchMySalesResponse response = usedProductServiceFacade.fetchMySales(query);
        return ApiUtils.success(response);
    }

    @GetMapping("/chat-rooms")
    public ApiUtils.ApiResult<FetchChatRoomsResponse> fetchChatRooms(@RequestHeader("X-User-Id") String memberId) {
        FetchChatRoomsResponse response = usedProductServiceFacade.fetchChatRooms(Integer.valueOf(memberId));
        return ApiUtils.success(response);
    }


    @GetMapping("/chat-rooms/{chatRoomId}")
    public ApiUtils.ApiResult<FetchChatMessagesResponse> fetchChatRoom(@RequestHeader("X-User-Id") String memberId,
                                                                    @PathVariable Integer chatRoomId) {

        FetchChatMessagesResponse response = usedProductServiceFacade.fetchChatMessages(Integer.valueOf(memberId), chatRoomId);
        return ApiUtils.success(response);
    }

    @PostMapping("/chat-rooms")
    public ApiUtils.ApiResult<CreateRoomResponse> createChatRoom(@RequestBody CreateChatRoomRequest request,
                                                                     @RequestHeader("X-User-Id") String buyerId){
        CreateChatRoomCommand command = request.toCommand(buyerId);
        CreateRoomResponse response = usedProductServiceFacade.createRoom(command);
        return ApiUtils.success(response);
    }

    /*
        /pub/chat/rooms/{chatRoomId}
     */
    @MessageMapping("/chat/rooms/{chatRoomId}")
    public void sendMessage(@Payload MessageRequest request,
                            @Header(value = "X-User-Id",required = false) String senderId,
                            @DestinationVariable Integer chatRoomId) {

        log.info("채팅 메시지 {}   채팅 룸 ID{} 채팅 이미지{}", request.message(), chatRoomId,request.image());
        MessageCommand command = request.toCommand(senderId, chatRoomId);
        FetchMessageResponse response = usedProductServiceFacade.message(command);

        messagingTemplate.convertAndSend(
                "/sub/chat/rooms/" + chatRoomId, response
        );
    }

    @PostMapping("/{usedProductId}/status")
    public ApiUtils.ApiResult<ModifyUsedProductStatusResponse> modifyStatus(@RequestBody ModifyUsedProductStatusRequest request,
                                                        @RequestHeader("X-User-Id") String memberId,
                                                        @PathVariable(name = "usedProductId") Integer usedProductId) {

        ModifyUsedProductStatusCommand command = request.toCommand(memberId, usedProductId);
        ModifyUsedProductStatusResponse response = usedProductServiceFacade.modifyStatus(command);
        return ApiUtils.success(response);
    }

    @GetMapping("/search")
    public ApiUtils.ApiResult<SearchUsedProductsResponse> searchUsedProducts(@RequestParam String keyword){
        SearchUsedProductsResponse response = usedProductServiceFacade.searchUsedProducts(
                keyword);

        return ApiUtils.success(response);
    }

    @GetMapping("/likes")
    public ApiUtils.ApiResult<FetchLikeUsedProductsResponse> fetchLikeUsedProducts(@RequestHeader("X-User-Id") String memberId) {
        FetchLikeUsedProductsResponse response = usedProductServiceFacade.fetchLikeUsedProducts(Integer.valueOf(memberId));
        return ApiUtils.success(response);
    }

}
