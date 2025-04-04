package com.awoo.alarm.ui.facade.internal.mapper;

import com.awoo.alarm.domain.Alarm;
import com.awoo.alarm.ui.facade.dto.request.FcmTokenDto;
import com.awoo.alarm.ui.facade.dto.response.DeleteFcmTokenResponse;
import com.awoo.alarm.ui.facade.dto.response.RegisterFcmTokenResponse;
import com.awoo.alarm.ui.facade.dto.response.SendAlarmResponse;
import org.springframework.stereotype.Component;

@Component
public class AlarmResponseMapper {

    public SendAlarmResponse sendAlarm(final Alarm alarm){
        return SendAlarmResponse.fromEntity(alarm);
    }

    public RegisterFcmTokenResponse registerFcmToken(){
        return RegisterFcmTokenResponse.register();
    }


    public DeleteFcmTokenResponse deleteFcmToken(){
        return DeleteFcmTokenResponse.delete();
    }
}
