package com.awoo.account.infra.ssafyfinance.response;

public record SSAFYFetchAccountResponse(String bankCode, String accountNo, Long accountBalance, String accountCreateDate, String ExpiryDate, String currency) {
}
