package com.awoo.admin.ui.facade;

import com.awoo.admin.application.command.CreateAdminAccountCommand;
import com.awoo.admin.application.command.CreateSavingProductCommand;
import com.awoo.admin.application.command.LoginAdminCommand;
import com.awoo.admin.domain.Role;
import com.awoo.admin.ui.facade.dto.response.SavingsProductResponse;

import java.util.List;

public interface AdminServiceFacade {
    void createSavingProduct(CreateSavingProductCommand command);

    List<SavingsProductResponse> getSavingsProduct();

    void createAdminAccount(CreateAdminAccountCommand command);

    Role loginAdmin(LoginAdminCommand command);
}
