package com.awoo.account.infra;

import com.awoo.account.domain.AccountEntity;
import com.awoo.account.domain.AccountRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface JpaAccountRepository extends AccountRepository, JpaRepository<AccountEntity,Integer> {

    AccountEntity findByAccountNumber(String accountNo);
    AccountEntity findByPetId(Integer petId);

}
