package com.awoo.admin.application.service;

import com.awoo.admin.application.command.AnswerQuestionCommand;
import com.awoo.admin.application.command.RegisterAnswerCommand;
import com.awoo.admin.ui.facade.dto.response.QuestionDetailResponse;
import com.awoo.admin.ui.facade.dto.response.fetchQuestionResponse;

import java.util.List;

public interface QuestionService {
    void registerQuestion(RegisterAnswerCommand command);

    void answerQuestion(AnswerQuestionCommand command);

    List<fetchQuestionResponse> fetchQuestionList();

    QuestionDetailResponse fetchQuestionDetail(int questionId);
}
