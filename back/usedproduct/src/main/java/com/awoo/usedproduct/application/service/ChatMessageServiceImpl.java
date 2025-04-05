package com.awoo.usedproduct.application.service;

import com.awoo.usedproduct.application.ChatMessageService;
import com.awoo.usedproduct.application.command.MessageCommand;
import com.awoo.usedproduct.application.exception.ApplicationErrorCode;
import com.awoo.usedproduct.application.exception.ChatRoomNotFoundException;
import com.awoo.usedproduct.domain.ChatMessageEntity;
import com.awoo.usedproduct.domain.ChatMessageRepository;
import com.awoo.usedproduct.domain.ChatRoomEntity;
import com.awoo.usedproduct.domain.ChatRoomRepository;
import com.awoo.usedproduct.infra.MemberClient;
import com.awoo.usedproduct.infra.MemberInfoResponse;
import com.awoo.usedproduct.infra.aws.S3Storage;
import com.awoo.usedproduct.infra.kafka.KafkaProducer;
import com.awoo.usedproduct.infra.kafka.KafkaTopic;
import com.awoo.usedproduct.infra.kafka.event.ChatEvent;
import com.awoo.usedproduct.support.ApiUtils.ApiResult;
import com.awoo.usedproduct.ui.facade.dto.response.FetchMessageResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatMessageServiceImpl implements ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final S3Storage s3Storage;
    private final KafkaProducer kafkaProducer;
    private final ChatRoomRepository chatRoomRepository;
    private final MemberClient memberClient;

    @Override
    public FetchMessageResponse saveMessage(MessageCommand command) {
        String imageUrl = null;


        // 이미지가 포함된 경우 S3에 업로드
        if (command.image() != null && !command.image().isBlank()) {
            String base64Image = command.image().startsWith("data:")
                    ? command.image().split(",")[1] // "data:image/jpeg;base64," 접두사 제거
                    : command.image();
            imageUrl = s3Storage.uploadFile(base64Image, "chat_image.jpg");
        }
        ChatMessageEntity entity = ChatMessageEntity.builder()
                .chatRoomId(command.chatRoomId())
                .senderId(command.senderId())
                .message(command.message())
                .image(imageUrl)
                .build();
        chatMessageRepository.save(entity);

        // 카프카 메시지 발행
        ChatRoomEntity chatRoomEntity = chatRoomRepository.findById(command.chatRoomId())
                .orElseThrow(() -> new ChatRoomNotFoundException(
                        ApplicationErrorCode.CHAT_ROOM_NOT_FOUND));

        Integer receiverId = null;

        if (chatRoomEntity.getBuyerId().equals(command.senderId())) {
            receiverId = chatRoomEntity.getSellerId();
        } else if (chatRoomEntity.getSellerId().equals(command.senderId())) {
            receiverId = chatRoomEntity.getBuyerId();
        }

        ApiResult<MemberInfoResponse> memberInfo = memberClient.fetchMemberInfo(
                receiverId);

        ChatEvent event = ChatEvent.builder()
                .senderName(memberInfo.getResponse().name())
                .receiverId(receiverId)
                .message(command.message())
                .image(command.image()).build();

        kafkaProducer.sendKafkaMessage(KafkaTopic.CHAT_MESSAGE.getTopicName(), event);

        return FetchMessageResponse.builder()
                .chatRoomId(command.chatRoomId())
                .image(imageUrl)
                .messageId(entity.getChatMessageId())
                .message(command.message())
                .senderId(command.senderId())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
