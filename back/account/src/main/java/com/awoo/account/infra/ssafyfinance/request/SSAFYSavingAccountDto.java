package com.awoo.account.infra.ssafyfinance.request;

public record SSAFYSavingAccountDto(
        String bankCode,
        String bankName,
        String userName,
        String accountNo,
        String accountName,
        String accountDescription,
        String withdrawalBankCode,
        String withdrawalBankName,
        String withdrawalAccountNo,
        String subscriptionPeriod,
        String depositBalance,
        String interestRate,
        String installmentNumber,
        String totalBalance,
        String accountCreateDate,
        String accountExpiryDate
) {}
