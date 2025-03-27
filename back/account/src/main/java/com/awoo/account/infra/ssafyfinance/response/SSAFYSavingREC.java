package com.awoo.account.infra.ssafyfinance.response;

import com.awoo.account.ui.facade.dto.response.SavingAccountResponse;

import java.util.List;

public record SSAFYSavingREC(String totalCount, List<SavingAccountResponse> list) {
}
