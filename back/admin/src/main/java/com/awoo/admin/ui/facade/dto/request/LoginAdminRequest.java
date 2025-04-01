package com.awoo.admin.ui.facade.dto.request;

import com.awoo.admin.application.command.LoginAdminCommand;

public record LoginAdminRequest(String adminId,
                                String adminPassword) {

    public LoginAdminCommand toCommand() {
        return LoginAdminCommand.builder()
                .adminId(adminId)
                .adminPassword(adminPassword)
                .build();
    }
}
