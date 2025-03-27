package com.awoo.member.infra.Kafka;

import com.awoo.member.application.service.MemberService;
import com.awoo.member.infra.BaseColumn.RequestHeaderAuditorAware;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor // 생성자 자동 생성
public class KafkaConsumer {
    private final MemberService memberService;

    // 등록해놓은 카프카 토픽에 데이터가 들어오면 실행되는 로직
    @KafkaListener(topics = "payments-register")
    public void updatePayment(String kafkaMessage) {
        log.info("Kafka Message : -> " + kafkaMessage);
        Map<String, Integer> map = new HashMap<>();
        // ObjectMapper를 통해 카프카로부터 받은 메시지를 Map 구조로 변환합니다.
        ObjectMapper mapper = new ObjectMapper();
        try {
            map = mapper.readValue(kafkaMessage, new TypeReference<>() {
            });
        } catch (JsonProcessingException ex) {
            ex.printStackTrace();
        }
        log.info("결과 확인" + " " + map);
        RequestHeaderAuditorAware.setCurrentAuditor(map.get("memberId").toString());
        memberService.paymentRegister(map.get("memberId"));
    }

    @KafkaListener(topics = "walk-success")
    public void updateWalkCount(String kafkaMessage) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            List<Integer> memberIdList = objectMapper.readValue(kafkaMessage, new TypeReference<>() {});
            memberService.updateWalkCount(memberIdList);
        }catch (JsonProcessingException ex) {
            ex.printStackTrace();
        }
    }

}