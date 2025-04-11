package com.awoo.member.infra.Kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.module.paramnames.ParameterNamesModule;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@AllArgsConstructor
public class KafkaProducer {

    // Kafka 메시지를 전송하기 위한 템플릿 (문자열 키, 값)
    private final KafkaTemplate<String, String> kafkaTemplate;

    // kafka에 메시지 전송
    public <T> void send(String topic, T payload) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new ParameterNamesModule());         // record 지원
        mapper.registerModule(new JavaTimeModule());               // LocalDateTime 등 날짜 지원
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // 날짜를 ISO 문자열로 직렬화
        try {
            String json = mapper.writeValueAsString(payload);
            kafkaTemplate.send(topic, json);
            log.info("Kafka Producer sent: {}", json);
        } catch (JsonProcessingException e) {
            log.error("Kafka message serialization failed", e);
        }
    }

}
