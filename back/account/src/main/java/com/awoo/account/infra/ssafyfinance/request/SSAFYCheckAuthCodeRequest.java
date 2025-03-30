package com.awoo.account.infra.ssafyfinance.request;

import com.awoo.account.infra.ssafyfinance.SSAFYFinanceCommonHeader;
import lombok.Builder;

public record SSAFYCheckAuthCodeRequest(SSAFYFinanceCommonHeader Header,
                                        String accountNo,
                                        String authText,
                                        String authCode) {
    @Builder
    public SSAFYCheckAuthCodeRequest {

    }
}
