package com.awoo.payment.domain.event;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum KafkaTopic {

	//요청
	PAYMENT_CHARGE("payment-charge"),

	//요청 결과
	PAYMENT_CHARGE_PROCESSED("payment-charge-processed"),

	//보상
	PAYMENT_CHARGE_COMPENSATE("payment-charge-compensate"),

	//응답
	PAYMENT_CHARGE_SUCCESS("payment-charge-success"),

	//등록
	PAYMENT_REGISTER("payments-register");

	private final String topicName;
}