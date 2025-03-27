package com.awoo.usedproduct.application;

import com.awoo.usedproduct.application.command.RegisterUsedProductCommand;

public interface RegisterUsedProductService {

    Integer registerUsedProduct(RegisterUsedProductCommand command);
}
