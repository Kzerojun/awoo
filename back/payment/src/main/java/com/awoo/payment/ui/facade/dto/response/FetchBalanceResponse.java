package com.awoo.payment.ui.facade.dto.response;


public record FetchBalanceResponse(int balance) {

    public static FetchBalanceResponse create(int balance) {
        return new FetchBalanceResponse(balance);
    }
}
