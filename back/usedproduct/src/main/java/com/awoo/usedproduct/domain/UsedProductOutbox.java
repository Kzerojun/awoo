package com.awoo.usedproduct.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "used_product_outbox")
public class UsedProductOutbox {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer usedProductMessageId;

    private String topic;

    @Enumerated(EnumType.STRING)
    private EventType evenType;

    @Column(columnDefinition = "JSON", nullable = false)
    private String payload;

    @Enumerated(EnumType.STRING)
    private Status status;

    private Integer aggregateId;

    @CreatedDate
    private LocalDateTime createdAt;

    @Builder
    public UsedProductOutbox(String topic, EventType evenType, String payload, Status status, Integer aggregateId) {
        this.topic = topic;
        this.evenType = evenType;
        this.payload = payload;
        this.status = status;
        this.aggregateId = aggregateId;
    }

    public enum Status {
        PENDING,
        PUBLISHED
    }

    public enum EventType {
        USED_PRODUCT_SAFE_SOLD
    }

    public void markAsPublished() {
        this.status = Status.PUBLISHED;
    }
}
