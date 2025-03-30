package com.awoo.account.application.command;

import lombok.Builder;

public record ChangeLimitCommand(String accountNo,
                                 String oneTimeTransferLimit,
                                 String dailyTransferLimit) {

    @Builder
    public ChangeLimitCommand {

    }
}
