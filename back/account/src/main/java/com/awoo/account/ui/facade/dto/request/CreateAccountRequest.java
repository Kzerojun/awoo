package com.awoo.account.ui.facade.dto.request;

import com.awoo.account.application.command.CreateAccountCommand;
import lombok.Builder;

public record CreateAccountRequest(String password, boolean conditionsAgreement) {

    @Builder
    public CreateAccountCommand toCommand() {
        return CreateAccountCommand.builder()
                .password(password)
                .conditionsAgreement(conditionsAgreement)
                .build();
    }

}
