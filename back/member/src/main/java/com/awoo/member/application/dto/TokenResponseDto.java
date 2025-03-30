package com.awoo.member.application.dto;

public record TokenResponseDto(
        String accessToken,
        String refreshToken
) {}
