package com.awoo.account.domain;

public interface AccountRepository {

    AccountEntity save(AccountEntity account);
    AccountEntity findByAccountNumber(String accountNo);
    AccountEntity findByPetId(Integer petId);

}
