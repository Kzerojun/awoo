package com.awoo.payment.application.impl;

import com.awoo.payment.application.CheckAuthCodeService;
import com.awoo.payment.application.command.CheckAuthCodeCommand;
import com.awoo.payment.application.exception.ApplicationErrorCode;
import com.awoo.payment.application.exception.AuthCodeMismatchException;
import com.awoo.payment.infra.redis.RedisHandler;
import com.awoo.payment.support.AuthTokenGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CheckAuthCodeServiceImpl implements CheckAuthCodeService {

    private final RedisHandler redisHandler;
    private final AuthTokenGenerator authTokenGenerator;

    @Override
    public String checkAuthCode(CheckAuthCodeCommand command) {
        boolean result = redisHandler.verifyAuthCode(command.phone(), command.authCode());
        if (!result) {
            throw new AuthCodeMismatchException(ApplicationErrorCode.AUTH_CODE_MISMATCH);
        }

        String authToken = authTokenGenerator.generateAuthToken();
        redisHandler.addAuthToken(authToken);

        return authToken;
    }
}
