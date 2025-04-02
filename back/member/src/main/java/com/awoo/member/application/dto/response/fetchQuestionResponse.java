package com.awoo.member.application.dto.response;

public record fetchQuestionResponse(int questionId,
                                    String subject,
                                    String category,
                                    boolean isPublic,
                                    int memberId,
                                    String name,
                                    String email,
                                    boolean isAnswer) {
}
