package com.awoo.account.application.command;

import lombok.Builder;

public record CreateSavingAccountCommand(String accountTypeUniqueNo,
                                         Long depositBalance,
                                         String withdrawalAccountNo,
                                         boolean conditionsAgreement,
                                         String password) {

    @Builder
    public CreateSavingAccountCommand {

    }

}
