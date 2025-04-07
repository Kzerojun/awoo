package com.awoo.account.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AccountRepository {

    AccountEntity save(AccountEntity account);
    AccountEntity findByAccountNumber(String accountNo);
    AccountEntity findByAccountId(Integer accountId);

    List<AccountEntity> findAllByMemberIdAndAccountType(Integer memberId, AccountType accountType);

    // AccountRepository.java
    Page<AccountEntity> findAll(Pageable pageable);

    long count();
}
