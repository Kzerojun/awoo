package com.awoo.account.application.command;

import lombok.Builder;

public record DeductBalanceCommand(Integer memberId,String accountNo, int amount) {

    @Builder
    public DeductBalanceCommand{

    }
}
