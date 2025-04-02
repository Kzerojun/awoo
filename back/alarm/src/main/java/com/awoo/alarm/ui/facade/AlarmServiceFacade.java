package com.awoo.alarm.ui.facade;

import com.awoo.alarm.ui.facade.dto.request.FcmSendDto;
import com.awoo.alarm.ui.facade.dto.response.SendAlarmResponse;

public interface AlarmServiceFacade {

    SendAlarmResponse sendAlarm(final FcmSendDto fcmSendDto);

}
