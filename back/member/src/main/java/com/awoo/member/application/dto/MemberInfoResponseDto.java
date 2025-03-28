package com.awoo.member.application.dto;

import lombok.Builder;

public record MemberInfoResponseDto(String nickname,
                                    String name,
                                    String email,
                                    String phone,
                                    String birthDate,
                                    String profileImage,
                                    boolean paymentRegister,
                                    Integer walkGrade) {

    @Builder
    public MemberInfoResponseDto {

    }


}
