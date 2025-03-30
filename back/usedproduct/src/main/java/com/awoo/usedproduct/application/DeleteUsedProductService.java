package com.awoo.usedproduct.application;

import com.awoo.usedproduct.application.command.DeleteUsedProductCommand;

public interface DeleteUsedProductService {

    void deleteUsedProduct(DeleteUsedProductCommand command);
}
