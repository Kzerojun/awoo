package com.awoo.account.infra.ssafyfinance.response;

import com.awoo.account.infra.ssafyfinance.SSAFYFinanceCommonHeader;

public record SSAFYFetchAccountResponse(SSAFYFinanceCommonHeader Header,SSAFYFetchAccountBalanceRec REC) {


}
