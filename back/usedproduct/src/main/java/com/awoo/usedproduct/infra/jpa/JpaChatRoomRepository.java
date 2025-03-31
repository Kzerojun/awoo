package com.awoo.usedproduct.infra.jpa;

import com.awoo.usedproduct.domain.ChatRoomEntity;
import com.awoo.usedproduct.domain.ChatRoomRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaChatRoomRepository extends JpaRepository<ChatRoomEntity,Integer>, ChatRoomRepository {
}
