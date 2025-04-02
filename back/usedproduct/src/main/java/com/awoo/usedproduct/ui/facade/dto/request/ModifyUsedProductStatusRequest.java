package com.awoo.usedproduct.ui.facade.dto.request;

import com.awoo.usedproduct.application.command.ModifyUsedProductStatusCommand;
import com.awoo.usedproduct.domain.PaymentType;
import com.awoo.usedproduct.domain.UsedProductStatus;

public record ModifyUsedProductStatusRequest(UsedProductStatus status, PaymentType type) {

    public ModifyUsedProductStatusCommand toCommand(String memberId, Integer usedProductId) {
        return ModifyUsedProductStatusCommand.builder()
                .status(status)
                .paymentType(type)
                .memberId(Integer.valueOf(memberId))
                .usedProductId(usedProductId)
                .build();
    }
}
