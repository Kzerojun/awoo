package com.awoo.usedproduct.application.service;

import com.awoo.usedproduct.application.ModifyStatusService;
import com.awoo.usedproduct.application.command.ModifyUsedProductStatusCommand;
import com.awoo.usedproduct.application.exception.ApplicationErrorCode;
import com.awoo.usedproduct.application.exception.UsedProductNotFoundException;
import com.awoo.usedproduct.domain.PaymentType;
import com.awoo.usedproduct.domain.UsedProductEntity;
import com.awoo.usedproduct.domain.UsedProductRepository;
import com.awoo.usedproduct.domain.UsedProductStatus;
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
    private final KafkaProducer kafkaProducer;

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
                    .build();
            kafkaProducer.sendKafkaMessage(KafkaTopic.USED_PRODUCT_SAFE_SOLD,event);
            usedProductEntity.modifyStatusBySafe(command.status());
        }

        return usedProductEntity.getUsedProductId();
    }
}
