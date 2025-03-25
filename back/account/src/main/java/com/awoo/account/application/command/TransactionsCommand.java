package com.awoo.account.application.command;

import lombok.Builder;

public record TransactionsCommand(String accountNo, String startDate, String endDate) {
    @Builder
    public  TransactionsCommand {

    }
}
