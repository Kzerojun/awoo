package com.awoo.admin.ui.facade.dto.request;

import com.awoo.admin.application.command.AnswerQuestionCommand;

public record AnswerQuestionRequest(Integer questionId,
                                    String answer) {

    public AnswerQuestionCommand toCommand() {
        return AnswerQuestionCommand.builder()
                .questionId(questionId)
                .answer(answer)
                .build();
    }
}
