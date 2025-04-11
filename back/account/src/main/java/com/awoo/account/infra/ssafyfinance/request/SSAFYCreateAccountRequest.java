package com.awoo.account.infra.ssafyfinance.request;

import com.awoo.account.infra.ssafyfinance.SSAFYFinanceCommonHeader;
import lombok.Builder;

public record SSAFYCreateAccountRequest(SSAFYFinanceCommonHeader Header, String accountTypeUniqueNo) {
    @Builder
    public SSAFYCreateAccountRequest {

    }
}
