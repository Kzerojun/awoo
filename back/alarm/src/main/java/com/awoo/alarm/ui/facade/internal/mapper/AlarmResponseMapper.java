package com.awoo.alarm.ui.facade.internal.mapper;

import com.awoo.alarm.domain.Alarm;
import com.awoo.alarm.ui.facade.dto.response.SendAlarmResponse;
import org.springframework.stereotype.Component;

@Component
public class AlarmResponseMapper {

    public SendAlarmResponse sendAlarm(final Alarm alarm){
        return SendAlarmResponse.fromEntity(alarm);
    }
}
