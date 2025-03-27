package com.awoo.account.ui.facade.dto.response;

public record EarlyInterestPayResponse(String bankCode,
                                       String bankName,
                                       String accountNo,
                                       String accountName,
                                       String interestRate,
                                       String accountCreateDate,
                                       String earlyTerminationDate,
                                       String totalBalance,
                                       String earlyTerminationInterest,
                                       String earlyTerminationBalance
) {
}
