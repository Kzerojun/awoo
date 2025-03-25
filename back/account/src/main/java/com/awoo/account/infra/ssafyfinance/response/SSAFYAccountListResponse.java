package com.awoo.account.infra.ssafyfinance.response;

import com.awoo.account.application.dto.SSAFYAccountResponseDto;
import com.awoo.account.infra.ssafyfinance.SSAFYFinanceCommonHeader;

import java.util.List;

public record SSAFYAccountListResponse(SSAFYFinanceCommonHeader Header, List<SSAFYAccountResponseDto> REC) {

}