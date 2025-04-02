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
@Getter
@Table(name = "messages")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class ChatMessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer chatMessageId;

    private Integer chatRoomId;

    private Integer senderId;

    private String message;

    //바이트 코드 형태
    private String image;

    @CreatedDate
    private LocalDateTime createdAt;

    @Builder
    public ChatMessageEntity(Integer chatRoomId, Integer senderId, String message, String image) {
        this.chatRoomId = chatRoomId;
        this.senderId = senderId;
        this.message = message;
        this.image = image;
    }
}
