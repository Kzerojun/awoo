package com.awoo.account.infra.ssafyfinance.response;

import com.awoo.account.infra.ssafyfinance.SSAFYFinanceCommonHeader;

import java.util.List;

public record SSAFYTransferResponse(SSAFYFinanceCommonHeader Header, List<SSAFYTransferREC> REC) {
}
