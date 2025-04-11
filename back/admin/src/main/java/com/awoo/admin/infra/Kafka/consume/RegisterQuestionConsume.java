package com.awoo.admin.infra.Kafka.consume;

import com.awoo.admin.application.command.RegisterAnswerCommand;

import java.time.LocalDateTime;

public record RegisterQuestionConsume(int questionId,
                                      String subject,
                                      String content,
                                      String category,
                                      LocalDateTime createdAt,
                                      Integer memberId,
                                      String name,
                                      String email) {
    public RegisterAnswerCommand toCommand() {
        return RegisterAnswerCommand.builder()
                .questionId(questionId)
                .subject(subject)
                .content(content)
                .category(category)
                .createdAt(createdAt)
                .memberId(memberId)
                .name(name)
                .email(email)
                .build();
    }
}
