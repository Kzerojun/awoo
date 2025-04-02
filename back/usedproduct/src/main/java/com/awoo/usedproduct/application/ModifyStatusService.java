package com.awoo.usedproduct.application;

import com.awoo.usedproduct.application.command.ModifyUsedProductStatusCommand;

public interface ModifyStatusService {

    Integer modifyStatus(ModifyUsedProductStatusCommand command);
}
