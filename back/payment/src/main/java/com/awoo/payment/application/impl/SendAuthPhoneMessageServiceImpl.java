package com.awoo.payment.application.impl;

import com.awoo.payment.application.SendAuthPhoneMessageService;
import com.awoo.payment.application.command.SendAuthPhoneMessageCommand;
import com.awoo.payment.application.exception.ApplicationErrorCode;
import com.awoo.payment.application.exception.MemberMismatchException;
import com.awoo.payment.infra.client.MemberClient;
import com.awoo.payment.infra.client.request.CheckMemberRequest;
import com.awoo.payment.infra.client.response.CheckMemberResponse;
import com.awoo.payment.infra.redis.RedisHandler;
import com.awoo.payment.infra.sms.CoolSms;
import com.awoo.payment.support.ApiUtils;
import com.awoo.payment.support.AuthNumberGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SendAuthPhoneMessageServiceImpl implements SendAuthPhoneMessageService {

    private final CoolSms coolSms;
    private final MemberClient memberClient;
    private final RedisHandler redisHandler;
    private final AuthNumberGenerator generator;

    @Override
    public void sendAuthPhoneMessage(SendAuthPhoneMessageCommand command) {
        ApiUtils.ApiResult<CheckMemberResponse> response = memberClient.checkMember(CheckMemberRequest.builder()
                .name(command.name())
                .phone(command.phone())
                .memberId(command.memberId())
                .build()
        );

        if(response.isSuccess()) {
            String authCode = generator.generateAuthNumber();
            coolSms.sendMessage("01055617043",command.phone(),authCode);
            redisHandler.addAuthCode(command.phone(), authCode);
        }else {
            throw new MemberMismatchException(ApplicationErrorCode.MEMBER_MISS_MATCH);
        }
    }
}
