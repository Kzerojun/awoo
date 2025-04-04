package com.awoo.alarm.application;

import com.awoo.alarm.application.command.RegisterFcmTokenCommand;

public interface RegisterFcmTokenService {

    void registerFcmToken(RegisterFcmTokenCommand command);

}
