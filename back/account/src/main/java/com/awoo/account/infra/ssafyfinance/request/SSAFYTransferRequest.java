package com.awoo.account.infra.ssafyfinance.request;

import com.awoo.account.infra.ssafyfinance.SSAFYFinanceCommonHeader;
import lombok.Builder;

public record SSAFYTransferRequest(SSAFYFinanceCommonHeader Header,
                                   String depositAccountNo,
                                   String depositTransactionSummary,
                                   Long transactionBalance,
                                   String withdrawalAccountNo,
                                   String withdrawalTransactionSummary) {

    @Builder
    public SSAFYTransferRequest {

    }
}
