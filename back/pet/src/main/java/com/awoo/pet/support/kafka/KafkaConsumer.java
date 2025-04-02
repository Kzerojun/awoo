package com.awoo.pet.support.kafka;

import com.awoo.pet.application.RegisterSavingIdService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaConsumer {

    private final ObjectMapper objectMapper;
    private final RegisterSavingIdService registerSavingIdService;

    @KafkaListener(topics = "account.saving.created.v1", groupId = "pet-savingId-group")
    public void consumeMessage(ConsumerRecord<String, String> record) {
        try {
            String message = record.value();
            log.info("Received Kafka message: {}", message);

            // JSON 문자열을 Map<String, Object>로 변환
            Map<String, Object> kafkaMessage = objectMapper.readValue(message, Map.class);
            Integer petId = (Integer) kafkaMessage.get("petId");
            Integer savingId = (Integer) kafkaMessage.get("savingId");

            registerSavingIdService.registerSavingId(petId, savingId);

        } catch (Exception e) {
            log.error("Failed to process Kafka message", e);
        }
    }


}
