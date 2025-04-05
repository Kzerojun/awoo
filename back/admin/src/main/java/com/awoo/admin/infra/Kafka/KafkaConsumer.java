package com.awoo.admin.infra.Kafka;

import com.awoo.admin.application.command.RegisterAnswerCommand;
import com.awoo.admin.application.command.RegisterReportCommand;
import com.awoo.admin.application.service.QuestionService;
import com.awoo.admin.application.service.ReportService;
import com.awoo.admin.infra.Kafka.consume.RegisterQuestionConsume;
import com.awoo.admin.infra.Kafka.consume.RegisterReportConsume;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.module.paramnames.ParameterNamesModule;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaConsumer {

    private final QuestionService questionService;
    private final ReportService reportService;

    //문의사항 발생
    @KafkaListener(topics = "account.register.question.v1", groupId = "admin-group")
    public void registerQuestion(String kafkaMessage) {
        log.info("Kafka Message : -> " + kafkaMessage);
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new ParameterNamesModule());         // record 지원
        mapper.registerModule(new JavaTimeModule());               // LocalDateTime 등 날짜 지원
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // 날짜를 ISO 문자열로 직렬화
        try {
            RegisterQuestionConsume payload = mapper.readValue(kafkaMessage, RegisterQuestionConsume.class);
            RegisterAnswerCommand command = payload.toCommand();
            questionService.registerQuestion(command);
            // 이후 로직 처리
        } catch (Exception e) {
            log.error("Kafka Consumer message parsing failed", e);
        }
    }

    //신고 사항 발생
    @KafkaListener(topics = "used-products-reported", groupId = "admin-group")
    public void registerReport(String kafkaMessage) {
        log.info("Kafka Message : -> " + kafkaMessage);
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new ParameterNamesModule());
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        try {
            RegisterReportConsume payload = mapper.readValue(kafkaMessage, RegisterReportConsume.class);
            RegisterReportCommand command = payload.toCommand();
            reportService.registerReport(command);
        } catch (Exception e) {
            log.error("Kafka Consumer message parsing failed", e);
        }
    }

    @Bean
    public NewTopic registerQuestionTopic() {
        return TopicBuilder.name("account.register.question.v1")
                .partitions(3)
                .replicas(1)
                .build();
    }

}