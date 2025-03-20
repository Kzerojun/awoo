package com.awoo.payment.domain;

import java.util.Optional;

public interface PaymentRepository {

    Optional<PaymentEntity> findById(Integer id);

    void store(PaymentEntity payment);
}
