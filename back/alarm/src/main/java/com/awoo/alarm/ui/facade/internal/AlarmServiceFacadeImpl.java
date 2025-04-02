package com.awoo.alarm.ui.facade.internal;

import com.awoo.alarm.application.SendAlarmService;
import com.awoo.alarm.domain.Alarm;
import com.awoo.alarm.ui.facade.AlarmServiceFacade;
import com.awoo.alarm.ui.facade.dto.request.FcmSendDto;
import com.awoo.alarm.ui.facade.dto.response.SendAlarmResponse;
import com.awoo.alarm.ui.facade.internal.mapper.AlarmResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AlarmServiceFacadeImpl implements AlarmServiceFacade {

    private final SendAlarmService sendAlarmService;
    private final AlarmResponseMapper mapper;


    @Override
    public SendAlarmResponse sendAlarm(final FcmSendDto fcmSendDto) {
        Alarm alarm = sendAlarmService.sendAlarmTo(fcmSendDto.toCommand());
        return mapper.sendAlarm(alarm);
    }
}
