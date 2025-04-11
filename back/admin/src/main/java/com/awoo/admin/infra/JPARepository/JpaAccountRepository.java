package com.awoo.admin.infra.JPARepository;

import com.awoo.admin.domain.Entity.AccountEntity;
import com.awoo.admin.domain.repository.AccountRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaAccountRepository extends AccountRepository, JpaRepository<AccountEntity,Integer> {
}
