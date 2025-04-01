package com.awoo.admin.infra.ssafyfinance.request;

import com.awoo.admin.infra.ssafyfinance.SSAFYFinanceCommonHeader;
import lombok.Builder;

public record SSAFYCommonHeaderRequest(SSAFYFinanceCommonHeader Header) {
    @Builder
    public SSAFYCommonHeaderRequest {

    }
}
