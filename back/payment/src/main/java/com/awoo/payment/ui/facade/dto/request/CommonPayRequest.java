package com.awoo.payment.ui.facade.dto.request;

import com.awoo.payment.application.command.CommonPayCommand;

public record CommonPayRequest(Integer usedProductId) {

    public CommonPayCommand toCommand(String memberId) {
        return CommonPayCommand.builder()
                .memberId(Integer.valueOf(memberId))
                .usedProductId(usedProductId)
                .build();
    }
}
