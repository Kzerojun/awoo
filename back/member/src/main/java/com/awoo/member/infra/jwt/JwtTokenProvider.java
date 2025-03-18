package com.awoo.member.infra.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private final JwtProperties jwtProperties;

    private Key getSignKey(String secretKey) {
//        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
//        System.out.println(key.toString());
        String keyBase64Encoded = Base64.getEncoder().encodeToString(secretKey.getBytes());
        byte[] keyBytes = keyBase64Encoded.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String createToken(String memberId, String email) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + jwtProperties.getAccessExpiration());

        return Jwts.builder()
                .setSubject(memberId)
                .claim("email", email)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(getSignKey(jwtProperties.getSecretKey()), SignatureAlgorithm.HS256)
                .compact();
    }

    // 토큰 검증, 토큰에서 값 추출 로직이 필요하면 추가 작성
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSignKey(jwtProperties.getSecretKey()))
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            // 예: ExpiredJwtException, MalformedJwtException 등
            return false;
        }
    }

    public String getSubject(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey(jwtProperties.getSecretKey()))
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String getEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey(jwtProperties.getSecretKey()))
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("email", String.class);
    }
}

