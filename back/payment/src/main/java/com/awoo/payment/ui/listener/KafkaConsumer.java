package com.awoo.payment.ui.listener;

import com.awoo.payment.application.SafePayService;
import com.awoo.payment.application.command.ConfirmSafeTransactionCommand;
import com.awoo.payment.ui.listener.event.UsedProductSoldOutBySafeEvent;
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

    @KafkaListener(topics = "used-product-safe-sold")
    public void processUsedProductSafeSold(UsedProductSoldOutBySafeEvent payload) {

        log.info("Received event: {}", payload.toString());

        ConfirmSafeTransactionCommand command = ConfirmSafeTransactionCommand.builder()
                .usedProductId(payload.usedProductId())
                .price(payload.price())
                .buyerId(payload.buyerId())
                .sellerId(payload.sellerId())
                .build();
        safePayService.confirmSafeTransaction(command);
    }
}
