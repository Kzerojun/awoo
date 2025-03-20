package com.awoo.payment.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentFactory {

    private final PasswordEncoder passwordEncoder;

    public PaymentEntity createPaymentEntity(Integer memberId, String password) {
        String encodedPassword = passwordEncoder.encode(password);

        return PaymentEntity.builder()
                .password(encodedPassword)
                .memberId(memberId)
                .build();
    }
}
