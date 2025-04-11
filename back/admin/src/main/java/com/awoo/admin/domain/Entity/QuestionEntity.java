package com.awoo.admin.domain.Entity;

import com.awoo.admin.domain.Process;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "questions")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class QuestionEntity {
    @Id
    @Column(name = "question_id", updatable = false, nullable = false)
    private int questionId;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private String content;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private String category;

    @Column
    @Enumerated(EnumType.STRING)
    private Process process;

    @Column
    private String answer;

    @Column(nullable = false)
    private Integer memberId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;


    @Builder
    public QuestionEntity(int questionId,
            String subject, String content, String category, LocalDateTime createdAt,
                          Integer memberId, String name, String email) {
        this.questionId = questionId;
        this.subject = subject;
        this.content = content;
        this.category = category;
        this.process = Process.P;
        this.createdAt = createdAt;
        this.memberId = memberId;
        this.name = name;
        this.email = email;
    }

    public void registerAnswer(String answer) {
        this.answer = answer;
        this.process = Process.R;
    }

}
