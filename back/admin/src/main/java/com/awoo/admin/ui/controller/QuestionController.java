package com.awoo.admin.ui.controller;

import com.awoo.admin.application.command.AnswerQuestionCommand;
import com.awoo.admin.support.ApiUtils;
import com.awoo.admin.ui.facade.QuestionServiceFacade;
import com.awoo.admin.ui.facade.dto.request.AnswerQuestionRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionServiceFacade questionServiceFacade;
    @GetMapping
    public ApiUtils.ApiResult<?> fetchQuestionList() {
        try {
            return ApiUtils.success(questionServiceFacade.fetchQuestionList());
        }catch (Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{questionId}")
    public ApiUtils.ApiResult<?> fetchQuestionDetail(@PathVariable int questionId) {
        try {
            return ApiUtils.success(questionServiceFacade.fetchQuestionDetail(questionId));
        }catch (Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/answer")
    public ApiUtils.ApiResult<?> answerQuestion(@RequestBody AnswerQuestionRequest request) {
        try {
            AnswerQuestionCommand command = request.toCommand();
            questionServiceFacade.answerQuestion(command);
            return ApiUtils.success("답변이 등록되었습니다.");
        }catch (Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }
}
