package com.awoo.account.ui.facade.dto.request;

import com.awoo.account.application.command.DeleteAccountCommand;

public record DeleteAccountRequest(String accountNo,
                                   String refundAccountNo) {
    public DeleteAccountCommand toCommand() {
        return DeleteAccountCommand.builder()
                .accountNo(accountNo)
                .refundAccountNo(refundAccountNo)
                .build();
    }
}
