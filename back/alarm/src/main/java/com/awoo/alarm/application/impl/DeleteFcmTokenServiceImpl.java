package com.awoo.alarm.application.impl;

import com.awoo.alarm.application.DeleteFcmTokenService;
import com.awoo.alarm.application.exception.FcmTokenRegisterException;
import com.awoo.alarm.support.redis.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteFcmTokenServiceImpl implements DeleteFcmTokenService {

    private final RedisService redisService;

    @Override
    public void deleteFcmToken(Integer memberId) {
        redisService.deleteValues("fcmtoken" + memberId);
    }
}
