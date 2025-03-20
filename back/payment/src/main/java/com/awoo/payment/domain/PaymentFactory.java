package com.awoo.payment.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentFactory {

    public PaymentEntity createPaymentEntity(Integer memberId) {
        return PaymentEntity.builder()
                .memberId(memberId)
                .build();
    }
}
