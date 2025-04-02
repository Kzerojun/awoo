package com.awoo.member.infra.Kafka.send;

import lombok.Builder;

import java.time.LocalDateTime;

public record RegisterQuestionSend(int questionId,
                                   String subject,
                                   String content,
                                   String category,
                                   LocalDateTime createdAt,
                                   Integer memberId,
                                   String name,
                                   String email) {

    @Builder
    public RegisterQuestionSend {

    }
}
