package com.awoo.gateway.filter;


import com.awoo.gateway.exception.ApiUtils;
import com.awoo.gateway.exception.JwtValidationException;
import com.awoo.gateway.jwt.JwtParser;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class JwtAuthenticationFilter extends AbstractGatewayFilterFactory<JwtAuthenticationFilter.Config> {

    private final JwtParser jwtParser;

    public JwtAuthenticationFilter(JwtParser jwtParser) {
        super(JwtAuthenticationFilter.Config.class);
        this.jwtParser = jwtParser;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String token = exchange.getRequest()
                    .getHeaders()
                    .getFirst(HttpHeaders.AUTHORIZATION);

            log.info("token: {}", token);

            // 토큰 1차 검증
            // TODO : JWT 인증절차 나중에 처리
            if (token == null || !token.startsWith("Bearer ")) {
//                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return chain.filter(exchange);
            }

            // Bearer 제거
            token = token.substring(7);

            try{
                // 토큰 2차 검증 후 추출
                Claims claims = jwtParser.getClaims(token);
                Integer memberId = claims.get("memberId", Integer.class);
                String role = claims.get("role", String.class);

                ServerHttpRequest modifiedRequest = exchange.getRequest().mutate()
                        .header("X-User-Id", String.valueOf(memberId))
                        .header("X-User-Role", role)
                        .build();

                log.info("Modified Headers: {}", modifiedRequest.getHeaders());

                return chain.filter(exchange.mutate().request(modifiedRequest).build());

            } catch (JwtValidationException e) {
                exchange.getResponse().setStatusCode(e.getStatus());
                exchange.getResponse().getHeaders().add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
                DataBuffer buffer = exchange.getResponse().bufferFactory()
                        .wrap(ApiUtils.error(e.getMessage(), e.getStatus()).toString().getBytes());
                return exchange.getResponse().writeWith(Mono.just(buffer));
            }
        };
    }


    public static class Config {

    }
}
