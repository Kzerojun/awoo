package com.awoo.member.application.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberUpdateRequestDto {
    private String name;
    private String phone;
    private String nickname;
}

