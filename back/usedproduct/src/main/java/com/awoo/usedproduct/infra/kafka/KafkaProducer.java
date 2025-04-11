package com.awoo.usedproduct.infra.kafka;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;

@Component
@RequiredArgsConstructor
@Slf4j
public class KafkaProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void sendKafkaMessage(String topic, Object value) {
        CompletableFuture<SendResult<String, Object>> future = kafkaTemplate.send(topic, value);
        future.whenComplete((result, ex) -> {
            if (ex == null) {
                handleSuccess(result);
            } else {
                handleFailure(ex);
            }
        });
    }

    private void handleSuccess(SendResult<String, Object> result) {
        log.info("메시지 전송 성공: topic={}, partition={}, offset={}, key={}, value={}",
                result.getRecordMetadata().topic(),
                result.getRecordMetadata().partition(),
                result.getRecordMetadata().offset(),
                result.getProducerRecord().key(),
                result.getProducerRecord().value()
        );
    }

    private void handleFailure(Throwable ex) {
        log.error("메시지 전송 실패: {}", ex.getMessage(), ex);
    }
}
