package com.awoo.payment.infra.jpa;

import com.awoo.payment.domain.PaymentEntity;
import com.awoo.payment.domain.PaymentRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaPaymentRepository extends JpaRepository<PaymentEntity, Integer>, PaymentRepository {

    @Override
    default void store(PaymentEntity payment) {
        save(payment);
    }
}
