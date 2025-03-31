package com.awoo.account.domain;

import java.util.List;

public interface AccountRepository {

    AccountEntity save(AccountEntity account);
    AccountEntity findByAccountNumber(String accountNo);
    AccountEntity findByAccountId(Integer accountId);

    List<AccountEntity> findAllByMemberIdAndAccountType(Integer memberId, AccountType accountType);
}
