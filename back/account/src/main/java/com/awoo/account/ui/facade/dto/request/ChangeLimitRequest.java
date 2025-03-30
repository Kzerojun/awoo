package com.awoo.account.ui.facade.dto.request;

import com.awoo.account.application.command.ChangeLimitCommand;

public record ChangeLimitRequest(String accountNo,
                                 String oneTimeTransferLimit,
                                 String dailyTransferLimit) {

    public ChangeLimitCommand toCommand() {
        return ChangeLimitCommand.builder()
                .accountNo(accountNo)
                .oneTimeTransferLimit(oneTimeTransferLimit)
                .dailyTransferLimit(dailyTransferLimit)
                .build();
    }
}
