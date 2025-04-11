package com.awoo.account.infra.ssafyfinance.response;

import com.awoo.account.infra.ssafyfinance.SSAFYFinanceCommonHeader;
import com.awoo.account.ui.facade.dto.response.EarlyInterestPayResponse;

public record SSAFYEarlyInterestPayResponse(SSAFYFinanceCommonHeader Header, EarlyInterestPayResponse REC) {
}
