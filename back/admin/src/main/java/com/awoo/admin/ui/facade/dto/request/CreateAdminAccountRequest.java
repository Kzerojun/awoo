package com.awoo.admin.ui.facade.dto.request;

import com.awoo.admin.application.command.CreateAdminAccountCommand;
import com.awoo.admin.domain.Role;

public record CreateAdminAccountRequest(String adminId,
                                        String adminPassword,
                                        Role role) {

    public CreateAdminAccountCommand toCommand() {
        return CreateAdminAccountCommand.builder()
                .adminId(adminId)
                .adminPassword(adminPassword)
                .role(role)
                .build();
    }
}
