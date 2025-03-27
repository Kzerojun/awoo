package com.awoo.usedproduct.ui.facade;

import com.awoo.usedproduct.application.command.RegisterUsedProductCommand;
import com.awoo.usedproduct.ui.facade.dto.response.RegisterUsedProductResponse;

public interface UsedProductServiceFacade {

    RegisterUsedProductResponse registerUsedProduct(RegisterUsedProductCommand command);
}
