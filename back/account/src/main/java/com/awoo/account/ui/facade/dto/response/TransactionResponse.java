package com.awoo.account.ui.facade.dto.response;

public record TransactionResponse(String transactionUniqueNo,
                                  String transactionDate,
                                  String transactionTime,
                                  String transactionType,
                                  String transactionTypeName,
                                  String transactionAccountNo,
                                  String transactionBalance,
                                  String transactionAfterBalance,
                                  String transactionSummary,
                                  String transactionMemo
) {
}
