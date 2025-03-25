package com.awoo.payment.application.command;

import lombok.Builder;

public record SendAuthPhoneMessageCommand(String phone, String name, Integer memberId) {

    @Builder
    public SendAuthPhoneMessageCommand{
    }
}
