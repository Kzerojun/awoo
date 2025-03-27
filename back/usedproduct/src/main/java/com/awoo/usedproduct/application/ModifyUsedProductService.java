package com.awoo.usedproduct.application;

import com.awoo.usedproduct.application.command.ModifyUsedProductCommand;

public interface ModifyUsedProductService {

    Integer modifyUsedProduct(ModifyUsedProductCommand command);
}

