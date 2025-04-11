package com.awoo.payment.application.command;

import lombok.Builder;

public record CheckAuthCodeCommand(String authCode, String phone, Integer memberId) {

    @Builder
    public CheckAuthCodeCommand{

    }
}
