package com.awoo.admin.application.service;

import com.awoo.admin.application.command.AnswerQuestionCommand;
import com.awoo.admin.application.command.RegisterAnswerCommand;
import com.awoo.admin.domain.Entity.QuestionEntity;
import com.awoo.admin.domain.repository.QuestionRepository;
import com.awoo.admin.infra.Kafka.KafkaProducer;
import com.awoo.admin.ui.facade.dto.response.QuestionDetailResponse;
import com.awoo.admin.ui.facade.dto.response.fetchQuestionResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class QuestionServiceImpl implements QuestionService{

    private final QuestionRepository questionRepository;
    private final KafkaProducer kafkaProducer;

    public void registerQuestion(RegisterAnswerCommand command) {
        QuestionEntity questionEntity = QuestionEntity.builder()
                .questionId(command.questionId())
                .subject(command.subject())
                .content(command.content())
                .category(command.category())
                .createdAt(command.createdAt())
                .memberId(command.memberId())
                .name(command.name())
                .email(command.email())
                .build();

        questionRepository.save(questionEntity);
    }

    @Transactional
    public void answerQuestion(AnswerQuestionCommand command) {
        QuestionEntity question = questionRepository.findByQuestionId(command.questionId());
        question.registerAnswer(command.answer());

        //member에 문의사항 답변 전달
        kafkaProducer.send("admin.register.answer.v1",
                Map.of("questionId", question.getQuestionId(), "answer", question.getAnswer()));
    }

    public List<fetchQuestionResponse> fetchQuestionList() {
        List<QuestionEntity> questions = questionRepository.findAll();

        return questions.stream()
                .map(q -> new fetchQuestionResponse(
                        q.getQuestionId(),
                        q.getName(),
                        q.getEmail(),
                        q.getSubject(),
                        q.getCreatedAt(),
                        q.getAnswer() != null  // answer가 null이 아니면 true
                ))
                .toList();
    }

    public QuestionDetailResponse fetchQuestionDetail(int questionId) {
        QuestionEntity question = questionRepository.findByQuestionId(questionId);

        return new QuestionDetailResponse(
                question.getSubject(),
                question.getName(),
                question.getContent(),
                question.getAnswer()
        );
    }

}
