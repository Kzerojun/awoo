package com.awoo.account.infra;

import com.awoo.account.domain.AccountEntity;
import com.awoo.account.domain.AccountRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaAccountRepository extends JpaRepository<AccountEntity,Integer>, AccountRepository {
}
