package com.awoo.admin.domain.repository;

import com.awoo.admin.domain.Entity.QuestionEntity;

import java.util.List;

public interface QuestionRepository {
    QuestionEntity save(QuestionEntity questionEntity);

    QuestionEntity findByQuestionId(Integer questionId);

    List<QuestionEntity> findAll();
}
