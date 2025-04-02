package com.awoo.admin.application.command;

import lombok.Builder;

public record CreateSavingProductCommand(String bankCode,
                                         String accountName,
                                         String accountDescription,
                                         String subscriptionPeriod,
                                         Long minSubscriptionBalance,
                                         Long maxSubscriptionBalance,
                                         Double interestRate,
                                         String rateDescription
) {

    @Builder
    public CreateSavingProductCommand {

    }
}
