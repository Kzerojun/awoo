package com.awoo.admin.ui.facade;

import com.awoo.admin.application.command.CreateSavingProductCommand;
import com.awoo.admin.ui.facade.dto.response.SavingsProductResponse;

import java.util.List;

public interface SavingServiceFacade {
    void createSavingProduct(CreateSavingProductCommand command);

    List<SavingsProductResponse> getSavingsProduct();
}
