package com.awoo.calendar.support.kafka;

import com.awoo.calendar.application.RegisterCalendarService;
import com.awoo.calendar.application.command.RegisterCalendarCommand;
import com.awoo.calendar.application.command.common.CalendarCommand;
import com.awoo.calendar.domain.CalendarType;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaConsumer {

    private final ObjectMapper objectMapper;
    private final RegisterCalendarService registerCalendarService;

    @KafkaListener(topics = "pet.walk.register.v1", groupId = "pet-walk-group")
    public void consumeMessage(ConsumerRecord<String, String> record) {
        try {
            String message = record.value();
            log.info("Received Kafka message: {}", message);

            // JSON 문자열을 Map<String, Object>로 변환
            Map<String, Object> kafkaMessage = objectMapper.readValue(message, Map.class);
            // 날짜 형식 지정 (Producer에서 사용한 형식과 일치해야 함)
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

            // 데이터 사용 예시
            Integer petId = (Integer) kafkaMessage.get("petId");
            Integer memberId = (Integer) kafkaMessage.get("memberId");
            String scheduleContent = (String) kafkaMessage.get("scheduleContent");
            // 문자열을 LocalDateTime으로 변환
            LocalDateTime startTime = LocalDateTime.parse((String) kafkaMessage.get("startTime"), formatter);
            LocalDateTime endTime = LocalDateTime.parse((String) kafkaMessage.get("endTime"), formatter);

            // 여기서 받은 데이터를 활용하여 원하는 로직을 수행 가능!

            CalendarCommand command = CalendarCommand.builder()
                    .memberId(memberId)
                    .petId(petId)
                    .scheduleContent(scheduleContent)
                    .startTime(startTime)
                    .endTime(endTime)
                    .color("#00FF00")
                    .calendarType(CalendarType.WALK)
                    .build();
            registerCalendarService.registerCalender(new RegisterCalendarCommand(command));
            log.info("✅ Calendar registered successfully: {}", command);



        } catch (Exception e) {
            log.error("Failed to process Kafka message", e);
        }
    }


}
