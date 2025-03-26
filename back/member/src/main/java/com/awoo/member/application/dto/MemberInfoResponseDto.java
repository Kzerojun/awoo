package com.awoo.member.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MemberInfoResponseDto {
    private String nickname;
    private String name;
    private String email;
    private String phone;
    private String birthDate;
    private String profileImage;
    private boolean paymentRegister;
}
