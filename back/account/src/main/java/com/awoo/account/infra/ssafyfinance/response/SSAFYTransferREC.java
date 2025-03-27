package com.awoo.account.infra.ssafyfinance.response;

public record SSAFYTransferREC(String transactionUniqueNo,
                               String accountNo,
                               String transactionDate,
                               String transactionType,
                               String transactionTypeName,
                               String transactionAccountNo) {
}
