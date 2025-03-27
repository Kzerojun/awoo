package com.awoo.account.infra.ssafyfinance.response;

import com.awoo.account.infra.ssafyfinance.SSAFYFinanceCommonHeader;
import com.awoo.account.ui.facade.dto.response.InterestPayResponse;

public record SSAFYInterestPayResponse(SSAFYFinanceCommonHeader Header, InterestPayResponse REC) {
}
