package com.awoo.alarm.support.kafka;

import com.awoo.alarm.application.SendAlarmService;
import com.awoo.alarm.application.command.FcmSendCommand;
import com.awoo.alarm.support.redis.RedisService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class AnswerKafkaConsumer {

    private final ObjectMapper objectMapper;
    private final RedisService redisService;
    private final SendAlarmService sendAlarmService;

    @KafkaListener(topics = "admin.register.answer.v1", groupId = "answer-register-group")
    public void consumeMessage(ConsumerRecord<String, String> record) {
        try {
            String message = record.value();
            log.info("Received Kafka message: {}", message);

            // JSON 문자열을 Map<String, Object>로 변환
            Map<String, Object> kafkaMessage = objectMapper.readValue(message, Map.class);

            // 데이터 사용 예시
            Integer receiverId = (Integer) kafkaMessage.get("memberId");
            String receiverName = (String) kafkaMessage.get("name");

            String fcmToken = redisService.getValues("fcmtoken" + receiverId);

            if(fcmToken != null) {
                FcmSendCommand fcmSendCommand = FcmSendCommand.builder()
                        .token(fcmToken)
                        .title("문의 사항 등록")
                        .body(receiverName + "문의 사항 답변 완료되었습니다.")
                        .build();
                sendAlarmService.sendAlarmTo(fcmSendCommand);
            }
        } catch (Exception e) {
            log.error("Failed to process Kafka message", e);
        }
    }

}
