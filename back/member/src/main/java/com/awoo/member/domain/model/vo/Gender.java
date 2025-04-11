package com.awoo.member.domain.model.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;

@Getter
@Embeddable
public class Gender {
    @Column(name = "gender", nullable = false, length = 1)
    private String value;

    protected Gender() {} // JPA 기본 생성자

    public Gender(String value) {
        if (!value.equals("M") && !value.equals("F")) {
            throw new IllegalArgumentException("성별은 'M' 또는 'F'로 입력해야 합니다.");
        }
        this.value = value;
    }

}

