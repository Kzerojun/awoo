package com.awoo.account.infra.ssafyfinance.response;

import com.awoo.account.ui.facade.dto.response.TransactionResponse;

import java.util.List;

public record SSAFYTransactionsREC(String totalCount, List<TransactionResponse> list) {
}
