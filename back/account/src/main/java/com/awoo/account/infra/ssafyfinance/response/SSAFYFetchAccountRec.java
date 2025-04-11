package com.awoo.account.infra.ssafyfinance.response;

import java.util.List;

public record SSAFYFetchAccountRec(String bankCode,
								   String accountNo,
								   Long accountBalance,
								   Currency currency,
								   String accountCreatedDate,
								   String accountExpiryDate,
								   String lastTransactionDate,
								   List<SSAFYAccountResponseDto> accountList) {

}
