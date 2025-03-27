package com.awoo.account.ui.facade.dto.request;

import com.awoo.account.application.command.TransactionsCommand;

public record TransactionsRequest(String accountNo, String startDate, String endDate) {

    public TransactionsCommand toCommond() {
        return TransactionsCommand.builder()
                .accountNo(accountNo)
                .startDate(startDate)
                .endDate(endDate)
                .build();
    }
}
