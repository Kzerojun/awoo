package com.awoo.usedproduct.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "chat_rooms")
@EntityListeners(AuditingEntityListener.class)
@Getter
public class ChatRoomEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer chatRoomId;

    private Integer sellerId;

    private Integer buyerId;

    private Integer usedProductId;

    @CreatedDate
    private LocalDateTime createdAt;

    @Builder
    public ChatRoomEntity(Integer sellerId, Integer buyerId, Integer usedProductId) {
        this.sellerId = sellerId;
        this.buyerId = buyerId;
        this.usedProductId = usedProductId;
    }
}
