package com.awoo.account.domain;

import java.util.Optional;

public interface AccountRepository {

    void save(AccountEntity account);

    Optional<AccountEntity> findByMemberId(Integer memberId);
}
