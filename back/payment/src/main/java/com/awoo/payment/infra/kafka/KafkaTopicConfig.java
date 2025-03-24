//package com.awoo.payment.infra.kafka;
//
//import com.awoo.payment.domain.event.KafkaTopic;
//import org.apache.kafka.clients.admin.NewTopic;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class KafkaTopicConfig {
//	@Bean
//	public NewTopic createPaymentChargedTopic() {
//		return new NewTopic(KafkaTopic.PAYMENT_CHARGE_PROCESSED.getTopicName(), 3, (short) 2);
//	}
//
//
//}
