package com.awoo.admin.ui.facade.internal;

import com.awoo.admin.application.command.CreateSavingProductCommand;
import com.awoo.admin.application.service.SavingService;
import com.awoo.admin.ui.facade.SavingServiceFacade;
import com.awoo.admin.ui.facade.dto.response.SavingsProductResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SavingServiceFacadeImpl implements SavingServiceFacade {

    private SavingService savingService;

    public void createSavingProduct(CreateSavingProductCommand command) {
        savingService.createSavingProduct(command);
    }

    public List<SavingsProductResponse> getSavingsProduct() {
        return savingService.getSavingsProduct();
    }
}
