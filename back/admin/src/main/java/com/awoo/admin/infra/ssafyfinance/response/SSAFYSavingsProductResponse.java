package com.awoo.admin.infra.ssafyfinance.response;

import com.awoo.admin.infra.ssafyfinance.SSAFYFinanceCommonHeader;
import com.awoo.admin.ui.facade.dto.response.SavingsProductResponse;

import java.util.List;

public record SSAFYSavingsProductResponse(SSAFYFinanceCommonHeader Header, List<SavingsProductResponse> REC) {
}
