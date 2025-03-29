package com.awoo.account.ui.facade.dto.request;

import com.awoo.account.application.command.CreateSavingAccountCommand;

public record CreateSavingAccount(String accountTypeUniqueNo,
                                  Long depositBalance,
                                  String withdrawalAccountNo,
                                  boolean conditionsAgreement,
                                  String password) {

    public CreateSavingAccountCommand toCommand() {
        return CreateSavingAccountCommand.builder()
                .accountTypeUniqueNo(accountTypeUniqueNo)
                .depositBalance(depositBalance)
                .withdrawalAccountNo(withdrawalAccountNo)
                .conditionsAgreement(conditionsAgreement)
                .password(password)
                .build();
    }

}
