package com.awoo.member.application.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Value;

@Getter
@Setter
@ToString
public class UserKeyRequestDto {

    String apiKey;
    String userId;

    public UserKeyRequestDto(String apiKey, String userId) {
        this.apiKey = apiKey;
        this.userId = userId;
    }
}
