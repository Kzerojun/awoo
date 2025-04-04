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
public class TransferKafkaConsumer {

    private final ObjectMapper objectMapper;
    private final RedisService redisService;
    private final SendAlarmService sendAlarmService;

    @KafkaListener(topics = "account.transfer.v1", groupId = "account-transfer-group")
    public void consumeMessage(ConsumerRecord<String, String> record) {
        try {
            String message = record.value();
            log.info("Received Kafka message: {}", message);

            // JSON 문자열을 Map<String, Object>로 변환
            Map<String, Object> kafkaMessage = objectMapper.readValue(message, Map.class);

            // 데이터 사용 예시
            Integer senderId = (Integer) kafkaMessage.get("senderId");
            Integer senderName = (Integer) kafkaMessage.get("senderName");
            Long transactionBalance =(Long) kafkaMessage.get("transactionBalance");
            Integer receiverId = (Integer) kafkaMessage.get("receiverId");
            String receiverName = (String) kafkaMessage.get("receiverName");

            String fcmToken = redisService.getValues("fcmtoken" + receiverId);
            String sendMessage = senderName + "님이 " + transactionBalance + "을 입금하였습니다.";
            if(fcmToken != null) {
                FcmSendCommand fcmSendCommand = FcmSendCommand.builder()
                        .token(fcmToken)
                        .title("계좌이체")
                        .body(sendMessage)
                        .build();
                sendAlarmService.sendAlarmTo(fcmSendCommand);
            }
        } catch (Exception e) {
            log.error("Failed to process Kafka message", e);
        }
    }
}
