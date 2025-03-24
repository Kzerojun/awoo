package com.awoo.member.infra.Kafka;

import com.awoo.member.domain.model.vo.UserKey;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

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
    public void send(String topic, UserKey userKey) {

        // ObjectMapper를 통해 ProductRegistDto 객체를 JSON 문자열로 변환
        ObjectMapper mapper = new ObjectMapper();
        String jsonInString = "";
        try {
            jsonInString = mapper.writeValueAsString(userKey);
        } catch (JsonProcessingException ex) {
            ex.printStackTrace();
        }

        // JSON 문자열을 해당 topic에 전달
        kafkaTemplate.send(topic, jsonInString);
        log.info("Kafka Producer sent data from the product micro service " + userKey);

    }

}
