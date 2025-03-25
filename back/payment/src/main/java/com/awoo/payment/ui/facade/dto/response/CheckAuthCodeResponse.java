package com.awoo.payment.ui.facade.dto.response;

public record CheckAuthCodeResponse(String authToken) {

    public static CheckAuthCodeResponse create(String token) {
        return new CheckAuthCodeResponse(token);
    }
}
