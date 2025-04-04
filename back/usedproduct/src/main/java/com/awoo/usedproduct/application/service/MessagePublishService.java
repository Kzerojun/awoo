package com.awoo.usedproduct.application.service;

import com.awoo.usedproduct.application.UsedProductOutboxRepository;
import com.awoo.usedproduct.domain.UsedProductOutbox;
import com.awoo.usedproduct.infra.kafka.KafkaProducer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MessagePublishService {

    private final UsedProductOutboxRepository usedProductOutboxRepository;
    private final KafkaProducer producer;

    @Scheduled(fixedRate = 1000)
    @Transactional
    public void publishMessage() {
        List<UsedProductOutbox> messages = usedProductOutboxRepository.read();
        messages.forEach(message -> {
            producer.sendKafkaMessage(message.getTopic(), message.getPayload());
            message.markAsPublished();
        });
    }
}
