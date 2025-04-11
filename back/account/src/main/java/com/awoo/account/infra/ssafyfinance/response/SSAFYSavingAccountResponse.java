package com.awoo.account.infra.ssafyfinance.response;

import com.awoo.account.infra.ssafyfinance.SSAFYFinanceCommonHeader;
import com.awoo.account.infra.ssafyfinance.request.SSAFYSavingAccountDto;

public record SSAFYSavingAccountResponse(SSAFYFinanceCommonHeader Header, SSAFYSavingAccountDto REC) {
}
