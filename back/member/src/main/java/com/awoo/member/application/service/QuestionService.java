package com.awoo.member.application.service;

import com.awoo.member.application.dto.request.QuestionDetailRequest;
import com.awoo.member.application.dto.request.RegisterQuestionRequest;
import com.awoo.member.application.dto.response.fetchQuestionResponse;
import com.awoo.member.infra.Kafka.comsume.RegisterAnswer;

import java.util.List;

public interface QuestionService {
    void registerQuestion(String memberId, RegisterQuestionRequest request);

    void registerAnswer(RegisterAnswer kafkaMessage);

    List<fetchQuestionResponse> fetchQuestionList();

    Object fetchQuestionDetail(QuestionDetailRequest request);
}
