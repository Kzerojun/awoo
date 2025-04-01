package com.awoo.admin.infra.Kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.kafka.core.KafkaAdmin;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class KafkaProducer {

    // Kafka 메시지를 전송하기 위한 템플릿 (문자열 키, 값)
    private final KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    public KafkaProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    // kafka에 메시지 전송
    public <T> void send(String topic, T payload) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            String json = mapper.writeValueAsString(payload);
            kafkaTemplate.send(topic, json);
            log.info("Kafka Producer sent: {}", json);
        } catch (JsonProcessingException e) {
            log.error("Kafka message serialization failed", e);
        }
    }

    @Bean
    public NewTopic createSavingTopic() {
        return TopicBuilder.name("account.saving.created.v1")
                .partitions(3)
                .replicas(1)
                .build();
    }

    @Bean
    public KafkaAdmin kafkaAdmin() {
        Map<String, Object> configs = new HashMap<>();
        configs.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        KafkaAdmin admin = new KafkaAdmin(configs);
        admin.setAutoCreate(false); // ← 이걸 추가하면 Spring 초기화 중 토픽 생성 방지 가능
        return admin;
    }

}
