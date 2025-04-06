package com.awoo.admin.ui.facade;

import com.awoo.admin.application.command.AnswerQuestionCommand;
import com.awoo.admin.ui.facade.dto.response.QuestionDetailResponse;
import com.awoo.admin.ui.facade.dto.response.fetchQuestionResponse;

import java.util.List;

public interface QuestionServiceFacade {
    void answerQuestion(AnswerQuestionCommand command);

    List<fetchQuestionResponse> fetchQuestionList();

    QuestionDetailResponse fetchQuestionDetail(int questionId);
}
