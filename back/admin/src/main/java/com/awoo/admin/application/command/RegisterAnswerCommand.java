package com.awoo.admin.application.command;

import lombok.Builder;

import java.time.LocalDateTime;

public record RegisterAnswerCommand(int questionId,
                                    String subject,
                                    String content,
                                    String category,
                                    LocalDateTime createdAt,
                                    Integer memberId,
                                    String name,
                                    String email) {
    @Builder
    public RegisterAnswerCommand {

    }
}
