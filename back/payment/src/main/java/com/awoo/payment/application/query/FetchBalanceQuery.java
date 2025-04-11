package com.awoo.payment.application.query;

import lombok.Builder;

public record FetchBalanceQuery(Integer memberId) {

    @Builder
    public FetchBalanceQuery{

    }
}
