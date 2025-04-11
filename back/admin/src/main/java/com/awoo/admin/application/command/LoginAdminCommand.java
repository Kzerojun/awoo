package com.awoo.admin.application.command;

import lombok.Builder;

public record LoginAdminCommand(String adminId,
                                String adminPassword) {

    @Builder
    public  LoginAdminCommand {

    }
}
