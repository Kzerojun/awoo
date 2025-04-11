package com.awoo.account.infra.ssafyfinance.request;

import com.awoo.account.infra.ssafyfinance.SSAFYFinanceCommonHeader;
import lombok.Builder;

public record SSAFYTransactionsRequest(SSAFYFinanceCommonHeader Header,
                                       String accountNo,
                                       String startDate,
                                       String endDate,
                                       String transactionType,
                                       String orderByType) {
    @Builder
    public SSAFYTransactionsRequest {

    }
}
