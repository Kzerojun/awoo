package com.awoo.admin.infra.JPARepository;

import com.awoo.admin.domain.Entity.AdminEntity;
import com.awoo.admin.domain.repository.AdminRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaAdminRepository extends AdminRepository, JpaRepository<AdminEntity,Integer> {
    AdminEntity findByAdminId(String adminId);

}
