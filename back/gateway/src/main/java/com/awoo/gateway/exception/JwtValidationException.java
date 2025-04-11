package com.awoo.gateway.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class JwtValidationException extends RuntimeException {
    private final HttpStatus status;

    public JwtValidationException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
}