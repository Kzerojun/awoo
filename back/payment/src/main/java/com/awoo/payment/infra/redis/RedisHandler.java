package com.awoo.payment.infra.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class RedisHandler {

    private final RedisTemplate<String, Object> redisTemplate;

    public boolean hasIdempotencyKey(String idempotencyKey) {
        return redisTemplate.hasKey(idempotencyKey);
    }

    public String getValue(String idempotencyKey) {
        return redisTemplate.opsForSet().pop(idempotencyKey).toString();
    }

    public void addIdempotencyKey(String idempotencyKey) {
        redisTemplate.opsForValue().set(idempotencyKey, "충전이 완료되었습니다.", 5, TimeUnit.MINUTES);
    }
}
