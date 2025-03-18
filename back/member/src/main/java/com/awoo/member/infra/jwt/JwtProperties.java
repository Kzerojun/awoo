package com.awoo.member.infra.jwt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
public class JwtProperties {

    @Value("${jwt.secret_key}")
    private String secretKey;
    @Value("${jwt.access_expiration}")
    private long accessExpiration;
    private long refreshExpiration;

}