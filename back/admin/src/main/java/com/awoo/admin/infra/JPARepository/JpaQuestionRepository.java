package com.awoo.admin.infra.JPARepository;

import com.awoo.admin.domain.Entity.QuestionEntity;
import com.awoo.admin.domain.repository.QuestionRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaQuestionRepository extends QuestionRepository, JpaRepository<QuestionEntity,Integer> {
}
