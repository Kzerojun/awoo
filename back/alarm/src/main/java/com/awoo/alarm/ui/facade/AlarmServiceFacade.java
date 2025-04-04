package com.awoo.alarm.ui.facade;

import com.awoo.alarm.ui.facade.dto.request.FcmSendDto;
import com.awoo.alarm.ui.facade.dto.request.FcmTokenDto;
import com.awoo.alarm.ui.facade.dto.response.DeleteFcmTokenResponse;
import com.awoo.alarm.ui.facade.dto.response.RegisterFcmTokenResponse;
import com.awoo.alarm.ui.facade.dto.response.SendAlarmResponse;

public interface AlarmServiceFacade {

    SendAlarmResponse sendAlarm(final FcmSendDto fcmSendDto);

    RegisterFcmTokenResponse registerFcmToken(final Integer memberId, final FcmTokenDto fcmTokenDto);

    DeleteFcmTokenResponse deleteFcmToken(final Integer memberId);

}
