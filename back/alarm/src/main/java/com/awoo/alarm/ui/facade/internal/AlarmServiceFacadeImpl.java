package com.awoo.alarm.ui.facade.internal;

import com.awoo.alarm.application.DeleteFcmTokenService;
import com.awoo.alarm.application.RegisterFcmTokenService;
import com.awoo.alarm.application.SendAlarmService;
import com.awoo.alarm.domain.Alarm;
import com.awoo.alarm.ui.facade.AlarmServiceFacade;
import com.awoo.alarm.ui.facade.dto.request.FcmSendDto;
import com.awoo.alarm.ui.facade.dto.request.FcmTokenDto;
import com.awoo.alarm.ui.facade.dto.response.DeleteFcmTokenResponse;
import com.awoo.alarm.ui.facade.dto.response.RegisterFcmTokenResponse;
import com.awoo.alarm.ui.facade.dto.response.SendAlarmResponse;
import com.awoo.alarm.ui.facade.internal.mapper.AlarmResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AlarmServiceFacadeImpl implements AlarmServiceFacade {

    private final SendAlarmService sendAlarmService;
    private final RegisterFcmTokenService registerFcmTokenService;
    private final DeleteFcmTokenService deleteFcmTokenService;
    private final AlarmResponseMapper mapper;


    @Override
    public SendAlarmResponse sendAlarm(final FcmSendDto fcmSendDto) {
        Alarm alarm = sendAlarmService.sendAlarmTo(fcmSendDto.toCommand());
        return mapper.sendAlarm(alarm);
    }

    @Override
    public RegisterFcmTokenResponse registerFcmToken(final Integer memberId, final FcmTokenDto fcmTokenDto) {
        registerFcmTokenService.registerFcmToken(fcmTokenDto.toCommand(memberId));
        return mapper.registerFcmToken();
    }

    @Override
    public DeleteFcmTokenResponse deleteFcmToken(final Integer memberId) {
        deleteFcmTokenService.deleteFcmToken(memberId);
        return mapper.deleteFcmToken();
    }
}
