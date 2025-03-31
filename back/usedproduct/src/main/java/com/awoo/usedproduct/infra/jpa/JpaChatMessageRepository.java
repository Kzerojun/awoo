package com.awoo.usedproduct.infra.jpa;

import com.awoo.usedproduct.domain.ChatMessageEntity;
import com.awoo.usedproduct.domain.ChatMessageRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaChatMessageRepository extends JpaRepository<ChatMessageEntity,Integer>, ChatMessageRepository {
}
