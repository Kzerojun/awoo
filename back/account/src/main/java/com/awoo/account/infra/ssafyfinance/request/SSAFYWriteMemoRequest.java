package com.awoo.account.infra.ssafyfinance.request;

import com.awoo.account.infra.ssafyfinance.SSAFYFinanceCommonHeader;
import lombok.Builder;

public record SSAFYWriteMemoRequest(SSAFYFinanceCommonHeader Header,
                                    String accountNo,
                                    String transactionUniqueNo,
                                    String transactionMemo
                                    ) {
    @Builder
    public SSAFYWriteMemoRequest {

    }
}
