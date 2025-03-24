package com.awoo.account.ui.facade.dto.request;

import com.awoo.account.application.command.DeductBalanceCommand;

public record DeductBalanceRequest(Integer memberId,String accountNo, int amount) {

    public DeductBalanceCommand toCommand() {
        return DeductBalanceCommand.builder()
                .amount(amount)
                .accountNo(accountNo)
                .memberId(memberId)
                .build();
    }
}
