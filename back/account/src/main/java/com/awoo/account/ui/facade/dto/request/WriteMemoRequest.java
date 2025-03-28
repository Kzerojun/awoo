package com.awoo.account.ui.facade.dto.request;

import com.awoo.account.application.command.WriteMemoCommand;

public record WriteMemoRequest(String accountNo,
                               String transactionUniqueNo,
                               String transactionMemo) {

    public WriteMemoCommand toCommand() {
        return WriteMemoCommand.builder()
                .accountNo(accountNo)
                .transactionUniqueNo(transactionUniqueNo)
                .transactionMemo(transactionMemo)
                .build();
    }
}
