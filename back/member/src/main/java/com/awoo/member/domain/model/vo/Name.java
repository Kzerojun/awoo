package com.awoo.member.domain.model.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;

@Getter
@Embeddable
public class Name {
    @Column(name = "name", nullable = false, length = 20)
    private String value;

    protected Name() {} // JPA 기본 생성자

    public Name(String value) {
        if (value == null || value.trim().isEmpty()) {
            throw new IllegalArgumentException("이름은 필수 입력값입니다.");
        }
        this.value = value;
    }

}

