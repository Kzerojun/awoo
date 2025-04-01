package com.awoo.admin.domain.repository;

import com.awoo.admin.domain.Entity.AdminEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository  {
    AdminEntity save(AdminEntity adminEntity);

    AdminEntity findByAdminId(String adminId);
}
