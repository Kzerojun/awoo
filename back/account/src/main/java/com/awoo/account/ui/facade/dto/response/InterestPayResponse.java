package com.awoo.account.ui.facade.dto.response;

public record InterestPayResponse(String bankCode,
                                  String bankName,
                                  String accountNo,
                                  String accountName,
                                  String interestRate,
                                  String accountCreateDate,
                                  String accountExpiryDate,
                                  String expiryBalance,
                                  String expiryInterest,
                                  String expiryTotalBalance
) {
}
