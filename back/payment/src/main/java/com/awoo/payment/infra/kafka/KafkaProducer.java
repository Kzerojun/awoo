//package com.awoo.payment.infra.kafka;
//
//import com.awoo.payment.domain.event.KafkaTopic;
//import lombok.RequiredArgsConstructor;
//import org.springframework.kafka.core.KafkaTemplate;
//import org.springframework.stereotype.Component;
//
//@Component
//@RequiredArgsConstructor
//public class KafkaProducer {
//
//	private final KafkaTemplate<String, Object> kafkaTemplate;
//
//	public void sendKafkaMessage(KafkaTopic topic, Object value){
//		kafkaTemplate.send(topic.getTopicName(), value);
//	}
//}
//
