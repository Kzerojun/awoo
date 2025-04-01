package com.awoo.admin.application.command;

import com.awoo.admin.domain.Role;
import lombok.Builder;

public record CreateAdminAccountCommand(String adminId,
                                        String adminPassword,
                                        Role role) {

    @Builder
    public  CreateAdminAccountCommand {

    }
}
