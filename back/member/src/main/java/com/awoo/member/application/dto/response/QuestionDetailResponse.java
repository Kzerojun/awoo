package com.awoo.member.application.dto.response;

import lombok.Builder;

public record QuestionDetailResponse(String subject,
                                     String name,
                                     String email,
                                     String content,
                                     String answer) {
    @Builder
    public QuestionDetailResponse {

    }
}
