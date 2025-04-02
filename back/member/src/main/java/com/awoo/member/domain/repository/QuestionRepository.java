package com.awoo.member.domain.repository;

import com.awoo.member.domain.model.QuestionEntity;

import java.util.List;

public interface QuestionRepository {
    QuestionEntity save(QuestionEntity questionEntity);

    QuestionEntity findByQuestionId(Integer questionId);

    List<QuestionEntity> findAll();
}
