package com.awoo.member.ui.controller;


import com.awoo.member.domain.model.vo.UserKey;
import com.awoo.member.infra.Kafka.KafkaProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/kafka")
@RequiredArgsConstructor
public class KafkaController {

    private final KafkaProducer kafkaProducer;

    // kafka 메시지를 보내는 함수
    @PostMapping("/send")
    public ResponseEntity<?> send(@RequestBody UserKey dto) {
        kafkaProducer.send("test-topic", dto);
        return ResponseEntity.ok("ok");
    }
}