package com.awoo.member.domain.model.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Embeddable
public class BirthDate {
    @Column(name = "birth_date", nullable = false)
    private LocalDate value;

    protected BirthDate() {} // JPA 기본 생성자

    public BirthDate(LocalDate value) {
        if (value.isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("생년월일은 미래일 수 없습니다.");
        }
        this.value = value;
    }

}

