package com.awoo.payment.ui.listener;

import com.awoo.payment.application.SafePayService;
import com.awoo.payment.application.command.ConfirmSafeTransactionCommand;
import com.awoo.payment.ui.listener.event.UsedProductSoldOutBySafeEvent;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class KafkaConsumer {
    private final SafePayService safePayService;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = "used-product-safe-sold")
    public void processUsedProductSafeSold(String message) {
        try {
            log.info("중고 물품 안심 결제 메시지: {}", message);
            UsedProductSoldOutBySafeEvent event = objectMapper.readValue(message,
                    UsedProductSoldOutBySafeEvent.class);

            ConfirmSafeTransactionCommand command = ConfirmSafeTransactionCommand.builder()
                    .usedProductId(event.usedProductId())
                    .price(event.price())
                    .buyerId(event.buyerId())
                    .sellerId(event.sellerId())
                    .build();

            safePayService.confirmSafeTransaction(command);

        } catch (JsonProcessingException e) {
            log.error(e.getMessage());
        }

    }
}
