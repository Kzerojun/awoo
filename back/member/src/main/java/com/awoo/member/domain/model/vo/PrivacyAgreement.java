package com.awoo.member.domain.model.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;

@Embeddable
@Getter
public class PrivacyAgreement {
    @Column(name = "privacy_agreed", nullable = false)
    private boolean value;

    protected PrivacyAgreement() {} // JPA 기본 생성자

    public PrivacyAgreement(boolean value) {
        this.value = value;
    }

}
