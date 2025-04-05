package com.awoo.admin.ui.facade.internal;

import com.awoo.admin.application.command.AnswerQuestionCommand;
import com.awoo.admin.application.service.QuestionService;
import com.awoo.admin.ui.facade.QuestionServiceFacade;
import com.awoo.admin.ui.facade.dto.response.QuestionDetailResponse;
import com.awoo.admin.ui.facade.dto.response.fetchQuestionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionServiceFacadeImpl implements QuestionServiceFacade {
    private final QuestionService questionService;

    public void answerQuestion(AnswerQuestionCommand command) {
        questionService.answerQuestion(command);
    }

    public List<fetchQuestionResponse> fetchQuestionList() {
        return questionService.fetchQuestionList();
    }

    public QuestionDetailResponse fetchQuestionDetail(int questionId) {
        return questionService.fetchQuestionDetail(questionId);
    }
}
