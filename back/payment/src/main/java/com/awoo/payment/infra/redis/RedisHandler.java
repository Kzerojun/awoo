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
        return redisTemplate.opsForValue().get(idempotencyKey).toString();
    }


    public void addIdempotencyKey(String idempotencyKey,Integer id) {
        redisTemplate.opsForValue().set(idempotencyKey, String.valueOf(id), 5, TimeUnit.MINUTES);
    }

    public void addAuthCode(String phoneNumber, String authCode) {
        String key = "auth_code:" + phoneNumber; // auth_code:+01012345678
        redisTemplate.opsForValue().set(key, authCode, 5, TimeUnit.MINUTES);
    }


    public boolean verifyAuthCode(String phoneNumber, String authCode) {
        String key = "auth_code:" + phoneNumber;
        String storedCode = (String) redisTemplate.opsForValue().get(key);

        if(storedCode != null && storedCode.equals(authCode)) {
            redisTemplate.delete(key);
            return true;
        }

        return false;
    }

    public void addAuthToken(String authToken) {
        String key = "auth_token:" + authToken;
        redisTemplate.opsForValue().set(key, "success", 5, TimeUnit.MINUTES);
    }

    public boolean verifyAuthToken(String authToken) {
        String key = "auth_token:" + authToken;
        String storedCode = (String) redisTemplate.opsForValue().get(key);

        if(storedCode != null && storedCode.equals("success")) {
            redisTemplate.delete(key);
            return true;
        }

        return false;
    }
}
