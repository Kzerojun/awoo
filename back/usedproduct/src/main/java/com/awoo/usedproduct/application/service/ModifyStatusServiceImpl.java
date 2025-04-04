package com.awoo.usedproduct.application.service;

import com.awoo.usedproduct.application.ModifyStatusService;
import com.awoo.usedproduct.application.UsedProductOutboxRepository;
import com.awoo.usedproduct.application.command.ModifyUsedProductStatusCommand;
import com.awoo.usedproduct.application.exception.ApplicationErrorCode;
import com.awoo.usedproduct.application.exception.UsedProductNotFoundException;
import com.awoo.usedproduct.domain.*;
import com.awoo.usedproduct.infra.kafka.KafkaProducer;
import com.awoo.usedproduct.infra.kafka.KafkaTopic;
import com.awoo.usedproduct.infra.kafka.event.UsedProductSoldOutBySafeEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ModifyStatusServiceImpl implements ModifyStatusService {

    private final UsedProductRepository usedProductRepository;
    private final UsedProductOutboxRepository usedProductOutboxRepository;
    private final UsedProductOutBoxFactory outBoxFactory;

    @Override
    @Transactional
    public Integer modifyStatus(ModifyUsedProductStatusCommand command) {
        UsedProductEntity usedProductEntity = usedProductRepository.findById(command.usedProductId()).orElseThrow(() -> new UsedProductNotFoundException(ApplicationErrorCode.PRODUCT_NOT_FOUND));
        if (command.paymentType().equals(PaymentType.COMMON)) {
            usedProductEntity.modifyStatus(command.status(), command.memberId());
        }

        if (command.status().equals(UsedProductStatus.SO) && command.paymentType().equals(PaymentType.SAFE)) {
            UsedProductSoldOutBySafeEvent event = UsedProductSoldOutBySafeEvent.builder()
                    .price(usedProductEntity.getPrice())
                    .sellerId(usedProductEntity.getMemberId())
                    .buyerId(command.memberId())
                    .usedProductId(usedProductEntity.getUsedProductId())
                    .build();

            UsedProductOutbox outbox = outBoxFactory.create(event, UsedProductOutbox.EventType.USED_PRODUCT_SAFE_SOLD, KafkaTopic.USED_PRODUCT_SAFE_SOLD);
            usedProductEntity.modifyStatusBySafe(command.status());
            usedProductOutboxRepository.save(outbox);
        }
        return usedProductEntity.getUsedProductId();
    }
}
