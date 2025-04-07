package com.awoo.admin.ui.facade.internal;

import com.awoo.admin.application.command.CreateAdminAccountCommand;
import com.awoo.admin.application.command.LoginAdminCommand;
import com.awoo.admin.application.service.AdminService;
import com.awoo.admin.domain.Role;
import com.awoo.admin.ui.facade.AdminServiceFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceFacadeImpl implements AdminServiceFacade {

    private final AdminService adminService;

    public void createAdminAccount(CreateAdminAccountCommand command) {
        adminService.createAdminAccount(command);
    }

    public Role loginAdmin(LoginAdminCommand command) {
        return adminService.loginAdmin(command);
    }

}
