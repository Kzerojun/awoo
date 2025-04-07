package com.awoo.admin.ui.facade;

import com.awoo.admin.application.command.CreateAdminAccountCommand;
import com.awoo.admin.application.command.LoginAdminCommand;
import com.awoo.admin.domain.Role;

public interface AdminServiceFacade {
    void createAdminAccount(CreateAdminAccountCommand command);

    Role loginAdmin(LoginAdminCommand command);

}
