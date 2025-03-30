package com.awoo.account.infra.ssafyfinance.request;

import com.awoo.account.infra.ssafyfinance.SSAFYFinanceCommonHeader;
import lombok.Builder;

public record SSAFYOpenAccountAuthRequest(SSAFYFinanceCommonHeader Header,
                                          String accountNo,
                                          String authText) {
    @Builder
    public SSAFYOpenAccountAuthRequest {

    }
}
