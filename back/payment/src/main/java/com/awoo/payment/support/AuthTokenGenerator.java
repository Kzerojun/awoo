package com.awoo.payment.support;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class AuthTokenGenerator {

    public String generateAuthToken() {
        return UUID.randomUUID().toString();
    }
}
