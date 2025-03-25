package com.awoo.member.application.dto;

public record AccountResponse(String backCode,
                              String bankName,
                              String userName,
                              String accountNo,
                              String accountName,
                              String accountTypeCode,
                              String accountTypeName,
                              String accountCreatedDate,
                              String accountExpiryDate,
                              String dailyTransferLimit,
                              String oneTimeTransferLimit,
                              String accountBalance,
                              String lastTransactionDate,
                              String currency
                              ) {

}
