package com.awoo.member.infra.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())

                // 요청별 인증/인가 규칙
                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers(HttpMethod.GET, "/")
//                        .permitAll()
//                        // 회원 가입 (POST /api/members)은 인증 없이 허용
//                        .requestMatchers(HttpMethod.POST, "/api/members")
//                        .permitAll()
//
//                        // 로그인 (POST /api/members/login)도 인증 없이 허용
//                        .requestMatchers(HttpMethod.POST, "/api/members/login")
//                        .permitAll()

                        // 회원 수정 (PUT /api/members)은 인증 필요
//                        .requestMatchers(org.springframework.http.HttpMethod.PUT, "/api/members")
//                        .authenticated()

                        // 그 외 모든 요청은 전부 허용(또는 필요에 따라 authenticated)
                        .anyRequest().permitAll()
                );

        return http.build();
    }
}
