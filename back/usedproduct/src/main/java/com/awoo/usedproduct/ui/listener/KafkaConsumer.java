package com.awoo.usedproduct.ui.listener;

import com.awoo.usedproduct.application.DeleteUsedProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class KafkaConsumer {

    private final ObjectMapper objectMapper;
    private final DeleteUsedProductService deleteUsedProductService;

    @KafkaListener(topics = "admin-report-delete")
    public void processUsedProductDeleteByAdmin(String message) throws JsonProcessingException {
        UsedProductDeleteByAdminEvent event = objectMapper.readValue(message, UsedProductDeleteByAdminEvent.class);
        deleteUsedProductService.deleteUsedProductByAdmin(event.usedProductId());
    }
}
