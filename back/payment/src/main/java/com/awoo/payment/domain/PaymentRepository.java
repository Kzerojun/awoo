package com.awoo.payment.domain;

import java.util.Optional;

public interface PaymentRepository {

    Optional<PaymentEntity> findById(Integer id);

    Optional<PaymentEntity> findByMemberId(Integer memberId);

    void store(PaymentEntity payment);

}
