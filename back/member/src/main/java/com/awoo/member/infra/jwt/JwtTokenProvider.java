package com.awoo.member.infra.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;
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
        System.out.println("키값:"+ signingKey.toString());
    }

    /**
     * 액세스 토큰 생성
     */
    public String createAccessToken(Integer userId, String email) {
        return createToken(userId, email, jwtProperties.getAccessExpiration());
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
//
//    // 토큰 검증, 토큰에서 값 추출 로직이 필요하면 추가 작성
//    public boolean validateToken(String token) {
//        try {
//            Jwts.parserBuilder()
//                    .setSigningKey(getSignKey(jwtProperties.getSecretKey()))
//                    .build()
//                    .parseClaimsJws(token);
//            return true;
//        } catch (Exception e) {
//            // 예: ExpiredJwtException, MalformedJwtException 등
//            return false;
//        }
//    }
//
//    public String getSubject(String token) {
//        return Jwts.parserBuilder()
//                .setSigningKey(getSignKey(jwtProperties.getSecretKey()))
//                .build()
//                .parseClaimsJws(token)
//                .getBody()
//                .getSubject();
//    }
//
//    public String getEmail(String token) {
//        return Jwts.parserBuilder()
//                .setSigningKey(getSignKey(jwtProperties.getSecretKey()))
//                .build()
//                .parseClaimsJws(token)
//                .getBody()
//                .get("email", String.class);
//    }
}

