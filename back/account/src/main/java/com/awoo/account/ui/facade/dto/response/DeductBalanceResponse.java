package com.awoo.account.ui.facade.dto.response;

import com.awoo.account.ui.facade.dto.response.constant.AccountResponseMessage;

public record DeductBalanceResponse(String message) {

    public static DeductBalanceResponse create() {
        return new DeductBalanceResponse(AccountResponseMessage.DEDUCT_BALANCE_SUCCESS.getMessage());
    }
}
