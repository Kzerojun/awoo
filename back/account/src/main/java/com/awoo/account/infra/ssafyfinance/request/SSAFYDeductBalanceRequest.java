package com.awoo.account.infra.ssafyfinance.request;

import lombok.Builder;

public record SSAFYDeductBalanceRequest(String accountNo, Long transactionBalance) {

    @Builder
    public SSAFYDeductBalanceRequest {

    }
}
