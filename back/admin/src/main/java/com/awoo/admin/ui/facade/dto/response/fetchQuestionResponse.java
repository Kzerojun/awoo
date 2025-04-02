package com.awoo.admin.ui.facade.dto.response;

import java.time.LocalDateTime;

public record fetchQuestionResponse(int questionId,
                                    String name,
                                    String email,
                                    String subject,
                                    LocalDateTime createdAt,
                                    boolean isAnswer) {
}
