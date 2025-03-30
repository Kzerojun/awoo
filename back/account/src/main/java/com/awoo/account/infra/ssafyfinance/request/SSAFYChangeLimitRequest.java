package com.awoo.account.infra.ssafyfinance.request;

import com.awoo.account.infra.ssafyfinance.SSAFYFinanceCommonHeader;
import lombok.Builder;

public record SSAFYChangeLimitRequest(SSAFYFinanceCommonHeader Header,
                                      String accountNo,
                                      String oneTimeTransferLimit,
                                      String dailyTransferLimit) {
    @Builder
    public SSAFYChangeLimitRequest {

    }

}
