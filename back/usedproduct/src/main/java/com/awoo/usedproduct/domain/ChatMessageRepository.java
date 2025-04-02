package com.awoo.usedproduct.domain;

import java.util.List;
import java.util.Optional;

public interface ChatMessageRepository {

    ChatMessageEntity save(ChatMessageEntity chatMessage);

    Optional<ChatMessageEntity> findFirstByChatRoomIdOrderByCreatedAtDesc(Integer chatRoomId);

    List<ChatMessageEntity> findAllByChatRoomIdOrderByCreatedAtDesc(Integer chatRoomId);
}
