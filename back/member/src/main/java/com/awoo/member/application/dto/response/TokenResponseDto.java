package com.awoo.member.application.dto.response;

public record TokenResponseDto(
        String accessToken,
        String refreshToken,
        Integer memberId
) {}
