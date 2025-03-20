package com.awoo.payment.domain;

import org.springframework.data.jpa.domain.Specification;

public interface PaymentSpecs {

    Specification<PaymentEntity> memberId(Integer memberId);
}
