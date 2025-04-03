package com.awoo.alarm.application.impl;

import com.awoo.alarm.application.RegisterFcmTokenService;
import com.awoo.alarm.application.command.RegisterFcmTokenCommand;
import com.awoo.alarm.support.redis.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegisterFcmTokenServiceImpl implements RegisterFcmTokenService {

    private final RedisService redisService;

    @Override
    public void registerFcmToken(RegisterFcmTokenCommand command) {

        redisService.setValues("fcmtoken" +command.memberId(), command.token());
    }
}
