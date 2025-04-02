package com.awoo.member.infra.Kafka;

import com.awoo.member.application.service.QuestionService;
import com.awoo.member.infra.Kafka.comsume.RegisterAnswer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.module.paramnames.ParameterNamesModule;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
//@RequiredArgsConstructor // 생성자 자동 생성
@AllArgsConstructor
public class KafkaConsumer {
    private final QuestionService questionService;
    @KafkaListener(topics = "admin.register.answer.v1")
    public void registerAnswer(String kafkaMessage) {
        log.info("Kafka Message : -> " + kafkaMessage);

        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new ParameterNamesModule());         // record 지원
        mapper.registerModule(new JavaTimeModule());               // LocalDateTime 등 날짜 지원
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // 날짜를 ISO 문자열로 직렬화
        try {
            RegisterAnswer payload = mapper.readValue(kafkaMessage, RegisterAnswer.class);
            questionService.registerAnswer(payload);
            // 이후 로직 처리
        } catch (Exception e) {
            log.error("Kafka Consumer message parsing failed", e);
        }
    }

}