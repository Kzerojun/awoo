package com.awoo.member.infra.repository;

import com.awoo.member.domain.model.QuestionEntity;
import com.awoo.member.domain.repository.QuestionRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaQuestionRepository extends QuestionRepository, JpaRepository<QuestionEntity, Long> {
}
