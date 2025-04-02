package com.awoo.alarm.application;

import com.awoo.alarm.application.command.FcmSendCommand;
import com.awoo.alarm.domain.Alarm;

public interface SendAlarmService {

    Alarm sendAlarmTo(FcmSendCommand fcmSendCommand);
}
