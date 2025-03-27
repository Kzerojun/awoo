package com.awoo.account.application.command;

import lombok.Builder;

public record TransferCommand(String depositAccountNo,
                              String depositTransactionSummary,
                              Long transactionBalance,
                              String withdrawalAccountNo,
                              String withdrawalTransactionSummary) {

    @Builder
    public TransferCommand {

    }
}
