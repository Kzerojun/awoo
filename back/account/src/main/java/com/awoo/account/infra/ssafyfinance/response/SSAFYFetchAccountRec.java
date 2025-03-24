package com.awoo.account.infra.ssafyfinance.response;

public record SSAFYFetchAccountRec(String bankCode,
								   String accountNo,
								   Long accountBalance,
								   String currency,
								   String accountCreatedDate,
								   String accountExpiryDate,
								   String lastTransactionDate) {

}
