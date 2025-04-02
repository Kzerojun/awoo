package com.awoo.usedproduct.application.service;

import com.awoo.usedproduct.application.CreateRoomService;
import com.awoo.usedproduct.application.command.CreateChatRoomCommand;
import com.awoo.usedproduct.application.exception.ApplicationErrorCode;
import com.awoo.usedproduct.application.exception.UsedProductNotFoundException;
import com.awoo.usedproduct.domain.ChatRoomEntity;
import com.awoo.usedproduct.domain.ChatRoomRepository;
import com.awoo.usedproduct.domain.UsedProductEntity;
import com.awoo.usedproduct.domain.UsedProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CreateRoomServiceImpl implements CreateRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final UsedProductRepository usedProductRepository;

    @Override
    public Integer createChatRoom(CreateChatRoomCommand command) {
        UsedProductEntity usedProductEntity = usedProductRepository.findById(command.usedProductId())
                .orElseThrow(() -> new UsedProductNotFoundException(ApplicationErrorCode.PRODUCT_NOT_FOUND));

        Optional<ChatRoomEntity> chatRoom = chatRoomRepository.findBySellerIdAndBuyerIdAndUsedProductId(usedProductEntity.getMemberId(), command.buyerId(), command.usedProductId());
        if (chatRoom.isPresent()) {
            return chatRoom.get().getChatRoomId();
        }

        ChatRoomEntity chatRoomEntity = ChatRoomEntity.builder()
                .buyerId(command.buyerId())
                .sellerId(usedProductEntity.getMemberId())
                .usedProductId(command.usedProductId())
                .build();

        chatRoomRepository.save(chatRoomEntity);
        return chatRoomEntity.getChatRoomId();
    }
}
