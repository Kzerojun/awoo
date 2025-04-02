package com.awoo.alarm.application.command;

import lombok.Builder;

public record FcmSendCommand(String token, String title, String body) {

    @Builder
    public FcmSendCommand{

    }
}
