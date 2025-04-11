package com.awoo.admin.application.service.impl;

import com.awoo.admin.application.command.CreateAdminAccountCommand;
import com.awoo.admin.application.command.LoginAdminCommand;
import com.awoo.admin.application.service.AdminService;
import com.awoo.admin.domain.Entity.AdminEntity;
import com.awoo.admin.domain.Role;
import com.awoo.admin.domain.repository.AdminRepository;
import com.awoo.admin.support.AESUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final AESUtil aesUtil;

    public void createAdminAccount(CreateAdminAccountCommand command) {
        AdminEntity adminEntity = AdminEntity.builder()
                .adminId(command.adminId())
                .adminPassword(aesUtil.encrypt(command.adminPassword()))
                .role(command.role())
                .build();

        adminRepository.save(adminEntity);
    }

    public Role loginAdmin(LoginAdminCommand command) {
        AdminEntity adminEntity = adminRepository.findByAdminId(command.adminId());
        if (aesUtil.decrypt(adminEntity.getAdminPassword()).equals(command.adminPassword())) {
            return adminEntity.getRole();
        }
        return null;
    }


}
