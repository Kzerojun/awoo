package com.awoo.member.domain.model.vo;

import com.awoo.member.infra.util.AESUtil;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;

@Getter
@Embeddable
public class UserKey {

    @Column(name = "user_key", nullable = false)
    private String value;

    protected UserKey() {} // JPA 기본 생성자

    public UserKey(String value) throws Exception {
        this.value = value;
    }


}
