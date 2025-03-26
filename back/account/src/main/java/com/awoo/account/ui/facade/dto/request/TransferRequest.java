package com.awoo.account.ui.facade.dto.request;

import com.awoo.account.application.command.TransferCommand;

public record TransferRequest(String depositAccountNo,
                             String depositTransactionSummary,
                             Long transactionBalance,
                             String withdrawalAccountNo,
                             String withdrawalTransactionSummary
) {
    public TransferCommand toCommand() {
        return TransferCommand.builder()
                .depositAccountNo(depositAccountNo)
                .depositTransactionSummary(depositTransactionSummary)
                .transactionBalance(transactionBalance)
                .withdrawalAccountNo(withdrawalAccountNo)
                .withdrawalTransactionSummary(withdrawalTransactionSummary)
                .build();
    }


}
