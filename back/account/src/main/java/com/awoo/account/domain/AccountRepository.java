package com.awoo.account.domain;

import java.util.Optional;

public interface AccountRepository {

    Optional<AccountEntity> findByMemberId(Integer memberId);
}
