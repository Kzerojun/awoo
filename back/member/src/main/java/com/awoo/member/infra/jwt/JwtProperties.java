package com.awoo.member.infra.jwt;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {

    @Value("${JWT_SECRET_KEY}")
    private String secretKey;
    private long accessExpiration;
    private long refreshExpiration;
}