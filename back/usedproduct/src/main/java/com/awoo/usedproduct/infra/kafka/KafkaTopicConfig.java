package com.awoo.usedproduct.infra.kafka;


import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KafkaTopicConfig {


    @Bean
    public NewTopic createUsedProductSoldTopic() {
        return new NewTopic(KafkaTopic.USED_PRODUCT_SAFE_SOLD.getTopicName(), 3, (short) 1);
    }

    @Bean
    public NewTopic createUsedProductMessageTopic() {
        return new NewTopic(KafkaTopic.CHAT_MESSAGE.getTopicName(), 3, (short) 1);
    }
}
