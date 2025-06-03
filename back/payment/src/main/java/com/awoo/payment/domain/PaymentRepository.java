package com.awoo.payment.domain;

import jakarta.persistence.LockModeType;
import java.util.Optional;
import org.springframework.data.jpa.repository.Lock;

public interface PaymentRepository {

    Optional<PaymentEntity> findById(Integer id);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<PaymentEntity> findByMemberId(Integer memberId);

    void store(PaymentEntity payment);

}
