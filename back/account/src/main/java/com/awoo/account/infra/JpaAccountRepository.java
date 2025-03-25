package com.awoo.account.infra;

import com.awoo.account.domain.AccountEntity;
import com.awoo.account.domain.AccountRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface JpaAccountRepository extends JpaRepository<AccountEntity,Integer>, AccountRepository {
    Optional<AccountEntity> findByMemberId(Integer memberId);
}
