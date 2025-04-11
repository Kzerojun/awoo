package com.awoo.admin.application.service;

import com.awoo.admin.application.command.CreateAdminAccountCommand;
import com.awoo.admin.application.command.LoginAdminCommand;
import com.awoo.admin.domain.Role;

public interface AdminService {
    void createAdminAccount(CreateAdminAccountCommand command);

    Role loginAdmin(LoginAdminCommand command);
}
