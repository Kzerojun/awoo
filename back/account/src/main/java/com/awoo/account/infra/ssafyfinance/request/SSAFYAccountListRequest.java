package com.awoo.account.infra.ssafyfinance.request;

import com.awoo.account.infra.ssafyfinance.SSAFYFinanceCommonHeader;
import lombok.Builder;

public record SSAFYAccountListRequest(SSAFYFinanceCommonHeader Header) {

    @Builder
    public SSAFYAccountListRequest {

    }

}
