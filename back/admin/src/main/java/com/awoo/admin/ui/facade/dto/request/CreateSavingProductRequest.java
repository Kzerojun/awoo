package com.awoo.admin.ui.facade.dto.request;

import com.awoo.admin.application.command.CreateSavingProductCommand;

public record CreateSavingProductRequest(String bankCode,
                                         String accountName,
                                         String accountDescription,
                                         String subscriptionPeriod,
                                         Long minSubscriptionBalance,
                                         Long maxSubscriptionBalance,
                                         Double interestRate,
                                         String rateDescription
) {

    public CreateSavingProductCommand toCommand() {
        return CreateSavingProductCommand.builder()
                .bankCode(bankCode)
                .accountName(accountName)
                .accountDescription(accountDescription)
                .subscriptionPeriod(subscriptionPeriod)
                .minSubscriptionBalance(minSubscriptionBalance)
                .maxSubscriptionBalance(maxSubscriptionBalance)
                .interestRate(interestRate)
                .rateDescription(rateDescription)
                .build();
    }
}
