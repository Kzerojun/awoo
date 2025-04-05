package com.awoo.admin.application.service;

import com.awoo.admin.application.command.CreateSavingProductCommand;
import com.awoo.admin.ui.facade.dto.response.SavingsProductResponse;

import java.util.List;

public interface SavingService {
    void createSavingProduct(CreateSavingProductCommand command);

    List<SavingsProductResponse> getSavingsProduct();
}
