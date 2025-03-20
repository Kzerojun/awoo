package com.awoo.payment.ui.facade.dto.response;

import java.math.BigDecimal;

public record FetchBalanceResponse(BigDecimal balance) {

    public static FetchBalanceResponse create(BigDecimal balance) {
        return new FetchBalanceResponse(balance);
    }
}
