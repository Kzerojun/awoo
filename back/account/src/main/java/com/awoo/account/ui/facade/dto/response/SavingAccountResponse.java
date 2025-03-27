package com.awoo.account.ui.facade.dto.response;

public record SavingAccountResponse(String bankCode,
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
) {
}
