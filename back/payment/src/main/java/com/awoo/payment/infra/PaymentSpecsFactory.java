package com.awoo.payment.infra;

import com.awoo.payment.domain.PaymentEntity;
import com.awoo.payment.domain.PaymentSpecs;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

public class PaymentSpecsFactory implements PaymentSpecs {

    @Override
    public Specification<PaymentEntity> memberId(Integer memberId) {
        return (Root<PaymentEntity> root, CriteriaQuery<?> query, CriteriaBuilder cb) ->
                cb.equal(root.<Integer>get("memberId"), memberId);
    }
}
