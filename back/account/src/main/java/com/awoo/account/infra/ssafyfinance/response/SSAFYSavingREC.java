package com.awoo.account.infra.ssafyfinance.response;

import com.awoo.account.infra.ssafyfinance.request.SSAFYSavingAccountDto;

import java.util.List;

public record SSAFYSavingREC(String totalCount, List<SSAFYSavingAccountDto> list) {
}
