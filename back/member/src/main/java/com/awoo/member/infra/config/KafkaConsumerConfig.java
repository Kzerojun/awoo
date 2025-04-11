//package com.awoo.member.infra.config;
//
//import org.apache.kafka.clients.consumer.ConsumerConfig;
//import org.apache.kafka.common.serialization.StringDeserializer;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.kafka.annotation.EnableKafka;
//import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
//import org.springframework.kafka.core.ConsumerFactory;
//import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@EnableKafka
//@Configuration
//public class KafkaConsumerConfig {
//
//    // 접속하고자 하는 곳에 정보
//    @Bean
//    public ConsumerFactory<String, String> consumerFactory() {
//
//        // Map을 이용해 Key, Value 형태로 Kafka Consumer에 필요한 설정을 저장합니다
//        Map<String, Object> properties = new HashMap<>();
//
//        // Kafka Broker 위치 저장합니다.
//        properties.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "j12c209.p.ssafy.io");
//
//        // Kafka Consumer 그룹의 ID 지정, 같은 그룹 ID를 가진 컨슈머들은 메시지를 공유하여 처리합니다.
//        properties.put(ConsumerConfig.GROUP_ID_CONFIG, "consumerGroupId");
//
//        // Kafka 메시지의 키, 값을 어떻게 역직렬화 할지 설정합니다.
//        properties.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
//        properties.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
//
//        // 위의 설정한 properties 값을 바탕으로 ConsumerFactory를 생성합니다.
//        return new DefaultKafkaConsumerFactory<>(properties);
//    }
//
//    // 위에서 정의한 consumerFactory를 사용해 Kafka Listener Containers를 만들어 줍니다.
//    // 이 설정을 사용하여 해당 토픽의 메시지를 가져옵니다.
//    @Bean
//    public ConcurrentKafkaListenerContainerFactory<String, String> kafkaListenerContainerFactory() {
//
//        ConcurrentKafkaListenerContainerFactory<String, String> kafkaListenerContainerFactory
//                = new ConcurrentKafkaListenerContainerFactory<>();
//
//        kafkaListenerContainerFactory.setConsumerFactory(consumerFactory());
//
//        return kafkaListenerContainerFactory;
//    }
//
//}
