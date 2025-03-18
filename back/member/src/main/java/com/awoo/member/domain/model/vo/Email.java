package com.awoo.member.domain.model.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;

@Getter
@Embeddable
public class Email {
    @Column(name = "email", nullable = false, length = 50)
    private String value;

    protected Email() {} // JPA 기본 생성자

    public Email(String value) {
        if (!value.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new IllegalArgumentException("유효하지 않은 이메일 형식입니다.");
        }
        this.value = value;
    }

}

