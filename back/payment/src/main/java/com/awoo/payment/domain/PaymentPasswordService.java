package com.awoo.payment.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentPasswordService {

    private final PasswordEncoder passwordEncoder;

    public void registerPassword(String password, PaymentEntity paymentEntity) {
        String encodedPassword = passwordEncoder.encode(password);
        paymentEntity.registerPassword(encodedPassword);
    }
}
