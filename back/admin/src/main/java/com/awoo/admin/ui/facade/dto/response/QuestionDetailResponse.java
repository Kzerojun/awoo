package com.awoo.admin.ui.facade.dto.response;

public record QuestionDetailResponse(String subject,
                                     String name,
                                     String content,
                                     String answer) {
}
