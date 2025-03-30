package com.awoo.account.infra.ssafyfinance.response;

import java.util.List;

public record SSAFYFetchAccountBalanceRec(String bankCode,
										  String accountNo,
										  Long accountBalance,
										  String currency,
										  String accountCreatedDate,
										  String accountExpiryDate,
										  String lastTransactionDate,
										  List<SSAFYAccountResponseDto> accountList) {

}
