package com.awoo.usedproduct.application.service;

import com.awoo.usedproduct.application.ChatMessageService;
import com.awoo.usedproduct.application.command.MessageCommand;
import com.awoo.usedproduct.domain.ChatMessageEntity;
import com.awoo.usedproduct.domain.ChatMessageRepository;
import com.awoo.usedproduct.infra.aws.S3Storage;
import com.awoo.usedproduct.infra.kafka.KafkaProducer;
import com.awoo.usedproduct.infra.kafka.KafkaTopic;
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

        kafkaProducer.sendKafkaMessage(KafkaTopic.CHAT_MESSAGE, entity);

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
