package com.awoo.gateway.jwt;

import com.awoo.gateway.exception.ErrorCode;
import com.awoo.gateway.exception.JwtValidationException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;

@Component
@RequiredArgsConstructor
public class JwtParser implements InitializingBean {

    private final JwtProperties jwtProperties;
    private SecretKey signingKey;

    @Override
    public void afterPropertiesSet() throws Exception {
        byte[] keyBytes =  Decoders.BASE64.decode(jwtProperties.getSecretKey());
        this.signingKey = Keys.hmacShaKeyFor(keyBytes);
        System.out.println("JWT PARSER 키값:"+ signingKey.toString());
    }

    public Claims getClaims(String token) {
        try{
            return Jwts.parser()
                    .verifyWith(signingKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        }catch (SecurityException | MalformedJwtException e) {
            throw new JwtValidationException(ErrorCode.INVALID_TOKEN.getMessage(), ErrorCode.INVALID_TOKEN.getStatus());
        } catch (ExpiredJwtException e) {
            throw new JwtValidationException(ErrorCode.EXPIRED_TOKEN.getMessage(), ErrorCode.EXPIRED_TOKEN.getStatus());
        } catch (UnsupportedJwtException e) {
            throw new JwtValidationException(ErrorCode.UNSUPPORTED_TOKEN.getMessage(), ErrorCode.UNSUPPORTED_TOKEN.getStatus());
        } catch (IllegalArgumentException e) {
            throw new JwtValidationException(ErrorCode.INVALID_TOKEN_FORMAT.getMessage(), ErrorCode.INVALID_TOKEN_FORMAT.getStatus());
        }
    }
}
