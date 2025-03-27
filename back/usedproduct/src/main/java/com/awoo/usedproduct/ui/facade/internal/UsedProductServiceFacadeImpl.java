package com.awoo.usedproduct.ui.facade.internal;

import com.awoo.usedproduct.application.RegisterUsedProductService;
import com.awoo.usedproduct.application.command.RegisterUsedProductCommand;
import com.awoo.usedproduct.ui.facade.UsedProductServiceFacade;
import com.awoo.usedproduct.ui.facade.dto.response.RegisterUsedProductResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsedProductServiceFacadeImpl implements UsedProductServiceFacade {

    private final RegisterUsedProductService registerUsedProductService;

    @Override
    public RegisterUsedProductResponse registerUsedProduct(RegisterUsedProductCommand command) {
        Integer usedProductId = registerUsedProductService.registerUsedProduct(command);
        return new RegisterUsedProductResponse(usedProductId);
    }
}
