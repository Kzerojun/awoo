package com.awoo.usedproduct.ui.facade.dto.request;

import com.awoo.usedproduct.application.command.ModifyUsedProductStatusCommand;
import com.awoo.usedproduct.domain.UsedProductStatus;

public record ModifyUsedProductStatusRequest(UsedProductStatus status) {

    public ModifyUsedProductStatusCommand toCommand(String memberId, Integer usedProductId) {
        return ModifyUsedProductStatusCommand.builder()
                .status(status)
                .memberId(Integer.valueOf(memberId))
                .usedProductId(usedProductId)
                .build();
    }
}
