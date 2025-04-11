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
public class ChatKafkaConsumer {

    private final ObjectMapper objectMapper;
    private final RedisService redisService;
    private final SendAlarmService sendAlarmService;

    @KafkaListener(topics = "chat-message", groupId = "usedProduct-chat-group")
    public void consumeMessage(ConsumerRecord<String, String> record) {
        try {
            String message = record.value();
            log.info("Received Kafka message: {}", message);

            // JSON 문자열을 Map<String, Object>로 변환
            Map<String, Object> kafkaMessage = objectMapper.readValue(message, Map.class);

            // 데이터 사용 예시
            Integer receiverId = (Integer) kafkaMessage.get("receiverId");
            String senderName = (String) kafkaMessage.get("senderName");
            String chatMessage = (String) kafkaMessage.get("message");
            String chatImage = (String) kafkaMessage.get("image");

            String fcmToken = redisService.getValues("fcmtoken" + receiverId);
            String sendMessage = senderName + " : ";

            if(chatMessage != null) {
                sendMessage += chatMessage;
            }

            if(chatImage != null) {
                sendMessage += chatImage;
            }

            if(fcmToken != null) {
                FcmSendCommand fcmSendCommand = FcmSendCommand.builder()
                        .token(fcmToken)
                        .title("중고거래 채팅")
                        .body(sendMessage)
                        .build();
                sendAlarmService.sendAlarmTo(fcmSendCommand);
            }
        } catch (Exception e) {
            log.error("Failed to process Kafka message", e);
        }
    }

}
