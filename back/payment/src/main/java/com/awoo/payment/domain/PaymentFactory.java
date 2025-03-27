package com.awoo.payment.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentFactory {

    public PaymentEntity createPaymentEntity(Integer memberId, String password) {
        return PaymentEntity.builder()
                .memberId(memberId)
                .password(password)
                .build();
    }
}
