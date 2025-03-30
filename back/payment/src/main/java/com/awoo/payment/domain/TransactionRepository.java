package com.awoo.payment.domain;

public interface TransactionRepository {

	TransactionEntity save(TransactionEntity entity);
}
