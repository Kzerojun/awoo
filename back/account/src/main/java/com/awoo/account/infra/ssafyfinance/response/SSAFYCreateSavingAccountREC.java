package com.awoo.account.infra.ssafyfinance.response;

public record SSAFYCreateSavingAccountREC(String bankCode,
                                          String bankName,
                                          String accountNo,
                                          String accountName,
                                          String withdrawalBankCode,
                                          String withdrawalAccountNo,
                                          String subscriptionPeriod,
                                          String depositBalance,
                                          String interestRate,
                                          String accountCreateDate,
                                          String accountExpiryDate
) {
}
