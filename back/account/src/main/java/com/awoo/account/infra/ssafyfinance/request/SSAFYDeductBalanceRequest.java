package com.awoo.account.infra.ssafyfinance.request;

import com.awoo.account.infra.ssafyfinance.SSAFYFinanceCommonHeader;
import lombok.Builder;

public record SSAFYDeductBalanceRequest(SSAFYFinanceCommonHeader Header, String accountNo, Long transactionBalance) {

    @Builder
    public SSAFYDeductBalanceRequest {

    }
}
