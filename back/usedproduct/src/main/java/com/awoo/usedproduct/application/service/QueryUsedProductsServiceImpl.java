package com.awoo.usedproduct.application.service;

import com.awoo.usedproduct.application.QueryUsedProductsService;
import com.awoo.usedproduct.application.exception.ApplicationErrorCode;
import com.awoo.usedproduct.application.exception.UsedProductNotFoundException;
import com.awoo.usedproduct.application.query.FetchMySalesQuery;
import com.awoo.usedproduct.application.query.FetchUsedProductQuery;
import com.awoo.usedproduct.domain.*;
import com.awoo.usedproduct.infra.MemberClient;
import com.awoo.usedproduct.infra.MemberNicknameResponse;
import com.awoo.usedproduct.infra.querydsl.QueryDslUsedProductRepository;
import com.awoo.usedproduct.support.ApiUtils;
import com.awoo.usedproduct.ui.facade.dto.response.FetchChatMessagesResponse;
import com.awoo.usedproduct.ui.facade.dto.response.FetchChatRoomResponse;
import com.awoo.usedproduct.ui.facade.dto.response.FetchChatRoomsResponse;
import com.awoo.usedproduct.ui.facade.dto.response.FetchMessageResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Slf4j
public class QueryUsedProductsServiceImpl implements QueryUsedProductsService {

    private final UsedProductRepository usedProductRepository;
    private final LikeRepository likeRepository;
    private final QueryDslUsedProductRepository queryDslUsedProductRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final MemberClient memberClient;

    @Override
    public Page<UsedProductEntity> fetchUsedProducts(Pageable pageable) {
        //계약 중, 예약중으로 20개 조회
        return usedProductRepository.findByUsedProductStatusIn(List.of(UsedProductStatus.SA, UsedProductStatus.RE), pageable);
    }

    @Override
    @Transactional
    public UsedProductEntity fetchUsedProduct(FetchUsedProductQuery query) {
        UsedProductEntity usedProductEntity = usedProductRepository.findById(query.usedProductId())
                .orElseThrow(() -> new UsedProductNotFoundException(
                        ApplicationErrorCode.PRODUCT_NOT_FOUND));
        usedProductEntity.increaseViewCount();
        return usedProductEntity;
    }

    @Override
    public List<UsedProductEntity> fetchMySales(FetchMySalesQuery query) {
        return queryDslUsedProductRepository.fetchMySales(query);
    }

    @Override
    public boolean isLiked(Integer usedProductId, Integer memberId) {
        if (memberId == null) {
            return false;
        }
        return likeRepository.existsByUsedProductIdAndMemberId(usedProductId, memberId);
    }

    @Override
    public FetchChatRoomsResponse fetchChatRooms(Integer memberId) {
        List<ChatRoomEntity> chatRoomEntities = chatRoomRepository.findBySellerIdOrBuyerId(memberId, memberId);

        List<FetchChatRoomResponse> chatRoomResponses = chatRoomEntities.stream()
                .map(chatRoom -> {
                    Optional<ChatMessageEntity> chatMessage = chatMessageRepository.findFirstByChatRoomIdOrderByCreatedAtDesc(chatRoom.getChatRoomId());
                    ApiUtils.ApiResult<MemberNicknameResponse> memberNickname = memberClient.fetchNickname(chatRoom.getSellerId());
                    return new FetchChatRoomResponse(
                            chatRoom.getChatRoomId(),
                            chatRoom.getUsedProductId(),
                            chatMessage.map(ChatMessageEntity::getMessage).orElse(null),
                            chatMessage.map(ChatMessageEntity::getCreatedAt).orElse(null),
                            memberNickname.getResponse().nickname()
                    );
                })
                .toList();

        return new FetchChatRoomsResponse(chatRoomResponses);
    }

    @Override
    public FetchChatMessagesResponse fetchChatMessages(Integer memberId, Integer chatRoomId) {
        List<ChatMessageEntity> chatMessageEntities = chatMessageRepository.findAllByChatRoomIdOrderByCreatedAtDesc(chatRoomId);
        List<FetchMessageResponse> fetchMessageResponse = chatMessageEntities.stream()
                .map(chatMessage -> FetchMessageResponse.builder()
                        .messageId(chatMessage.getChatMessageId())
                        .senderId(chatMessage.getSenderId())
                        .message(chatMessage.getMessage())
                        .image(chatMessage.getImage())
                        .chatRoomId(chatMessage.getChatRoomId())
                        .createdAt(chatMessage.getCreatedAt())
                        .build()
                ).toList();

        return new FetchChatMessagesResponse(fetchMessageResponse);
    }

    @Override
    public List<UsedProductEntity> searchUsedProducts(String keyword) {
        log.info("Keyword 검색 : {} ",keyword);
        return usedProductRepository.findByTitleContaining(keyword);
    }

    @Override
    public List<UsedProductEntity> fetchLikeUsedProducts(Integer memberId) {
        List<LikeEntity> likes = likeRepository.findByMemberId(memberId);

        // 2. usedProductId 추출
        List<Integer> usedProductIds = likes.stream()
                .map(LikeEntity::getUsedProductId)
                .toList();

        // 3. 해당 상품들 조회
        return usedProductRepository.findByUsedProductIdIn(usedProductIds);
    }
}

