package com.awoo.member.application.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class SignUpRequestDto {
    private String email;
    private String password;
    private String name;
    private LocalDate birthDate;
    private String gender;     // "M" or "F"
    private String phone;
    private boolean privacyAgreed;
    private String nickname;
}

