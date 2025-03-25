package com.awoo.payment.support;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class AuthNumberGenerator {
    public String generateAuthNumber() {
        Random random = new Random();
        int authNumber = random.nextInt(900000) + 100000; // 100000 ~ 999999 범위
        return String.valueOf(authNumber);
    }
}
