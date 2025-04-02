package com.awoo.admin.application.command;

import lombok.Builder;

public record AnswerQuestionCommand(Integer questionId,
                                    String answer) {

    @Builder
    public  AnswerQuestionCommand {

    }
}
