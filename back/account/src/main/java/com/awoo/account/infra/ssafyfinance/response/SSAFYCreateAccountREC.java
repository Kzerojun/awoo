package com.awoo.account.infra.ssafyfinance.response;

public record SSAFYCreateAccountREC(String bankCode,
                                    String accountNo,
                                    Currency currency) {
}
