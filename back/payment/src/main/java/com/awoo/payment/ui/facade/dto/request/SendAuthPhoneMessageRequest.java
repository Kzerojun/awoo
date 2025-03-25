package com.awoo.payment.ui.facade.dto.request;

import com.awoo.payment.application.command.SendAuthPhoneMessageCommand;
import com.awoo.payment.ui.exception.NameRequiredException;
import com.awoo.payment.ui.exception.PhoneRequiredException;

public record SendAuthPhoneMessageRequest(String name, String phone) {


    public SendAuthPhoneMessageCommand toCommand(String memberId) {
        validate();
        return SendAuthPhoneMessageCommand.builder()
                .name(name)
                .memberId(Integer.valueOf(memberId))
                .phone(phone)
                .build();
    }

    private void validate(){
        if(name.isBlank()) {
            throw new NameRequiredException();
        }

        if(phone.isBlank()) {
            throw new PhoneRequiredException();
        }
    }
}
