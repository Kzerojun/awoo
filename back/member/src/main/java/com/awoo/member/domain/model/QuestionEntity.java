package com.awoo.member.domain.model;

import com.awoo.member.infra.BaseColumn.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "questions")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class QuestionEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id", updatable = false, nullable = false)
    private int questionId;

    @Column(nullable = false)
    private int memberId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private boolean isPublic;

    @Column
    private String password;

    @Column
    private String answer;

    @Builder
    public QuestionEntity(int memberId, String name, String email,
                          String subject, String content, String category,
                          boolean isPublic, String password) {
        this.memberId = memberId;
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.content = content;
        this.category = category;
        this.isPublic = isPublic;
        this.password = password;
    }

    public void registerAnswer(String answer) {this.answer = answer;}

}
