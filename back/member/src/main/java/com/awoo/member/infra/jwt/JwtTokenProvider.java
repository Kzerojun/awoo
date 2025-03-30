package com.awoo.member.infra.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider implements InitializingBean {

    private final JwtProperties jwtProperties;
    private SecretKey signingKey;

    @Override
    public void afterPropertiesSet(){
        byte[] keyBytes =  Decoders.BASE64.decode(jwtProperties.getSecretKey());
        this.signingKey = Keys.hmacShaKeyFor(keyBytes);
        System.out.println("키값:"+ signingKey);
    }

    /**
     * 액세스 토큰 생성
     */
    public String createAccessToken(Integer userId, String email) {
        return createToken(userId, email, jwtProperties.getAccessExpiration());
    }

    public String createRefreshToken(Integer userId, String email) {
        return createToken(userId, email, jwtProperties.getRefreshExpiration());
    }

    /**
     * JWT 토큰 생성
     */
    private String createToken(Integer memberId, String email,long expiration) {
        return Jwts.builder()
                .subject(email)
                .claim("memberId", memberId)
                .signWith(signingKey)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(signingKey)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    public Integer getMemberIdFromToken(String token) {
        return getClaims(token).get("memberId", Number.class).intValue();
    }

    public String getEmailFromToken(String token) {
        return getClaims(token).getSubject(); // subject에 email 저장됨
    }

    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(signingKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

}

