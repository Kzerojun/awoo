package com.awoo.account.infra;

import com.awoo.account.domain.AccountEntity;
import com.awoo.account.domain.AccountRepository;
import com.awoo.account.domain.AccountType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface JpaAccountRepository extends AccountRepository, JpaRepository<AccountEntity,Integer> {

    AccountEntity findByAccountNumber(String accountNo);
    AccountEntity findByAccountId(Integer accountId);

    List<AccountEntity> findAllByMemberIdAndAccountType(Integer memberId, AccountType accountType);

    long count();
}
