package com.awoo.admin.ui.facade.dto.response;

public record SavingsProductResponse(String accountTypeUniqueNo,
                                     String bankCode,
                                     String bankName,
                                     String accountTypeCode,
                                     String accountTypeName,
                                     String accountName,
                                     String accountDescription,
                                     String subscriptionPeriod,
                                     Long minSubscriptionBalance,
                                     Long maxSubscriptionBalance,
                                     Double interestRate,
                                     String rateDescription
) {
}
