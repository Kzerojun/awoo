package com.awoo.member.application.dto.request;

public record RegisterQuestionRequest(String subject,

                                      String content,

                                      String category,

                                      boolean isPublic,
                                      String password) {
}
