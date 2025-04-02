package com.awoo.member.application.service;

import com.awoo.member.application.dto.request.QuestionDetailRequest;
import com.awoo.member.application.dto.request.RegisterQuestionRequest;
import com.awoo.member.application.dto.response.QuestionDetailResponse;
import com.awoo.member.application.dto.response.fetchQuestionResponse;
import com.awoo.member.domain.model.Member;
import com.awoo.member.domain.model.QuestionEntity;
import com.awoo.member.domain.repository.MemberRepository;
import com.awoo.member.domain.repository.QuestionRepository;
import com.awoo.member.infra.Kafka.KafkaProducer;
import com.awoo.member.infra.Kafka.comsume.RegisterAnswer;
import com.awoo.member.infra.Kafka.send.RegisterQuestionSend;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class QuestionServiceImpl implements QuestionService{

    private final QuestionRepository questionRepository;
    private final MemberRepository memberRepository;
    private final KafkaProducer kafkaProducer;
    public void registerQuestion(String memberId, RegisterQuestionRequest request) {
        //작성자 정보 조회
        Member member = memberRepository.findById(Integer.valueOf(memberId))
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        QuestionEntity questionEntity = QuestionEntity.builder()
                .memberId(member.getId())
                .name(member.getName().getValue())
                .email(member.getEmail().getValue())
                .subject(request.subject())
                .content(request.content())
                .category(request.category())
                .isPublic(request.isPublic())
                .password(request.password())
                .build();

        questionRepository.save(questionEntity);


        RegisterQuestionSend message = RegisterQuestionSend.builder()
                .questionId(questionEntity.getQuestionId())
                .subject(questionEntity.getSubject())
                .content(questionEntity.getContent())
                .category(questionEntity.getCategory())
                .createdAt(questionEntity.getCreatedAt())
                .memberId(member.getId())
                .name(member.getName().getValue())
                .email(member.getEmail().getValue())
                .build();

        //관리자 서버에 문의사항 전달
        kafkaProducer.send("account.register.question.v1", message);
    }

    //admin서버에서 받아온 답변 저장
    @Transactional
    public void registerAnswer(RegisterAnswer kafkaMessage) {
        QuestionEntity question = questionRepository.findByQuestionId(kafkaMessage.questionId());
        question.registerAnswer(kafkaMessage.answer());
    }

    public List<fetchQuestionResponse> fetchQuestionList() {
        return questionRepository.findAll().stream()
                .map(q -> new fetchQuestionResponse(
                        q.getQuestionId(),
                        q.getSubject(),
                        q.getCategory(),
                        q.isPublic(),
                        q.getMemberId(),
                        q.getName(),
                        q.getEmail(),
                        q.getAnswer() != null
                ))
                .toList();
    }

    public QuestionDetailResponse fetchQuestionDetail(QuestionDetailRequest request) {
        QuestionEntity question = questionRepository.findByQuestionId(request.questionId());

        //비공개글인데 비밀번호가 다른 경우
        if (!question.isPublic() && !question.getPassword().equals(request.password())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        return QuestionDetailResponse.builder()
                .subject(question.getSubject())
                .content(question.getContent())
                .email(question.getEmail())
                .name(question.getName())
                .answer(question.getAnswer())
                .build();
    }


}
