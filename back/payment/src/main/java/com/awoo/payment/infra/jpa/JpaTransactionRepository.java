package com.awoo.payment.infra.jpa;

import com.awoo.payment.domain.TransactionEntity;
import com.awoo.payment.domain.TransactionRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaTransactionRepository extends JpaRepository<TransactionEntity,Integer>,
		TransactionRepository {

}
