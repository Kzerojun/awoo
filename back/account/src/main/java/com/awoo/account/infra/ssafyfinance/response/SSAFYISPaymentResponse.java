package com.awoo.account.infra.ssafyfinance.response;

import com.awoo.account.infra.ssafyfinance.SSAFYFinanceCommonHeader;
import com.awoo.account.ui.facade.dto.response.InquireSavingPaymentResponse;

import java.util.List;

public record SSAFYISPaymentResponse(SSAFYFinanceCommonHeader Header, List<InquireSavingPaymentResponse> REC) {
}
