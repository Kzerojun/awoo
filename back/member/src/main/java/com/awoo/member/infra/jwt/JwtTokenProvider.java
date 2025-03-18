package com.awoo.member.infra.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private final long validityInMilliseconds = 3600000; // 1시간
    private final JwtProperties jwtProperties;

    private Key getSignKey(String secretKey) {
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String createToken(String memberId, String email) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
                .setSubject(memberId)               // 보통 subject에 userId나 식별자 저장
                .claim("email", email)             // 커스텀 클레임
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(getSignKey(jwtProperties.getSecretKey()), SignatureAlgorithm.HS256)
                .compact();
    }

    // 만약 토큰 검증, 토큰에서 값 추출 로직이 필요하면 추가 작성
}

