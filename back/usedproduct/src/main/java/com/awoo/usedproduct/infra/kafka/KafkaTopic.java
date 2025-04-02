package com.awoo.usedproduct.infra.kafka;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum KafkaTopic {

    USED_PRODUCT_SAFE_SOLD("used-product-safe-sold");


    private final String topicName;
}
