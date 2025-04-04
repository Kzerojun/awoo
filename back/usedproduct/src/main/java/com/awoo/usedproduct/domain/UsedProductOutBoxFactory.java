package com.awoo.usedproduct.domain;

import com.awoo.usedproduct.infra.kafka.KafkaTopic;
import com.awoo.usedproduct.infra.kafka.event.UsedProductSoldOutBySafeEvent;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UsedProductOutBoxFactory {

    private final ObjectMapper objectMapper; // Jackson 직렬화를 위한 의존성 주입

    public UsedProductOutbox create(UsedProductSoldOutBySafeEvent event,UsedProductOutbox.EventType eventType, KafkaTopic kafkaTopic) {

        return UsedProductOutbox.builder()
                .topic(kafkaTopic.getTopicName())
                .evenType(eventType)
                .status(UsedProductOutbox.Status.PENDING)
                .aggregateId(event.usedProductId())
                .payload(serializeToJson(event))
                .build();
    }

    private String serializeToJson(Object event) {
        try {
            return objectMapper.writeValueAsString(event);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("이벤트 직렬화 실패: " + e.getMessage(), e);
        }
    }
}
