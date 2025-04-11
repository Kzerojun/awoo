package com.awoo.account.application.command;

import lombok.Builder;

public record WriteMemoCommand(String accountNo,
                               String transactionUniqueNo,
                               String transactionMemo) {

    @Builder
    public WriteMemoCommand {

    }
}
