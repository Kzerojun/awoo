package com.awoo.member.application.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberUpdateRequestDto {
    private String name;
    private String phone;
    private String profileImage;
    private String nickname;
}

