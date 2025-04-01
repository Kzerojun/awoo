package com.awoo.usedproduct.application.command;

import com.awoo.usedproduct.domain.UsedProductStatus;
import lombok.Builder;

public record ModifyUsedProductStatusCommand(Integer usedProductId, UsedProductStatus status, Integer memberId) {


    @Builder
    public ModifyUsedProductStatusCommand {

    }
}
