package com.awoo.payment.domain.event;

import lombok.Getter;

@Getter
public enum KafkaTopic {

	//요청
	PAYMENT_CHARGE("payment-charge"),

	//요청 결과
	PAYMENT_CHARGE_PROCESSED("payment-charge-processed"),

	//보상
	PAYMENT_CHARGE_COMPENSATE("payment-charge-compensate"),

	//응답
	PAYMENT_CHARGE_SUCCESS("payment-charge-success");

	private final String topicName;

	KafkaTopic(String topicName) {
		this.topicName = topicName;
	}
}