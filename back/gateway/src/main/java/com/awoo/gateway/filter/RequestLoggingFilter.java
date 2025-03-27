package com.awoo.gateway.filter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.filter.factory.rewrite.ModifyRequestBodyGatewayFilterFactory;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Slf4j
@Component
@RequiredArgsConstructor
public class RequestLoggingFilter implements GlobalFilter, Ordered {

    private final ModifyRequestBodyGatewayFilterFactory modifyRequestBodyGatewayFilterFactory;

    private static void logRequest(final ServerHttpRequest request, final String body) {

        log.info("Request Id: {}, URI: {}, Headers: {}, QueryParams: {}, Body: {}",
                request.getId(),
                request.getURI(),
                request.getHeaders(),
                request.getQueryParams(),
                body);
    }

    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        if (isMultipartRequest(exchange.getRequest())) {
            // Multipart 요청은 로깅 생략
            return chain.filter(exchange);
        }
        return modifyRequestBodyGatewayFilterFactory
                .apply(modifyRequestBodyGatewayFilterConfig())
                .filter(exchange, chain);
    }

    private boolean isMultipartRequest(ServerHttpRequest request) {
        String contentType = request.getHeaders().getFirst(HttpHeaders.CONTENT_TYPE);
        return contentType != null && contentType.startsWith("multipart/");
    }

    private ModifyRequestBodyGatewayFilterFactory.Config modifyRequestBodyGatewayFilterConfig() {
        return new ModifyRequestBodyGatewayFilterFactory.Config()
                .setRewriteFunction(String.class, String.class, (exchange, body) -> {
                            logRequest(exchange.getRequest(), body);
                            return Mono.justOrEmpty(body);
                        }
                );
    }

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }
}