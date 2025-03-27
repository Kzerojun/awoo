package com.awoo.account.infra.ssafyfinance.request;

import com.awoo.account.infra.ssafyfinance.SSAFYFinanceCommonHeader;
import lombok.Builder;

public record SSAFYCreateSavingAccountRequest(SSAFYFinanceCommonHeader Header, String accountTypeUniqueNo, Long depositBalance, String withdrawalAccountNo) {

    @Builder
    public SSAFYCreateSavingAccountRequest {

    }
}
