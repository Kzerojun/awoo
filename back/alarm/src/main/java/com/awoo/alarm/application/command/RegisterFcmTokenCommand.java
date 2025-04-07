package com.awoo.alarm.application.command;

import lombok.Builder;

public record RegisterFcmTokenCommand(Integer memberId, String token) {

    @Builder
    public RegisterFcmTokenCommand{

    }
}
