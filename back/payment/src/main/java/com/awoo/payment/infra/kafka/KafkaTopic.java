package com.awoo.payment.infra.kafka;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum KafkaTopic {

    PAYMENT_REGISTER("payments-register");

    private final String topic;
}
