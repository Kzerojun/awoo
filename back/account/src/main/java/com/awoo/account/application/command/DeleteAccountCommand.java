package com.awoo.account.application.command;

import lombok.Builder;

public record DeleteAccountCommand(String accountNo,
                                   String refundAccountNo) {

    @Builder
    public  DeleteAccountCommand {

    }
}
