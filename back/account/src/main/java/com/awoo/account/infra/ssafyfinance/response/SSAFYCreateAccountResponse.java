package com.awoo.account.infra.ssafyfinance.response;

import com.awoo.account.infra.ssafyfinance.SSAFYFinanceCommonHeader;

public record SSAFYCreateAccountResponse(SSAFYFinanceCommonHeader Header, SSAFYCreateAccountREC REC) {
}
