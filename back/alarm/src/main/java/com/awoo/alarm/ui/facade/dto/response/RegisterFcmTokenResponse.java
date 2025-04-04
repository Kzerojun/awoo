package com.awoo.alarm.ui.facade.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterFcmTokenResponse {

    private String message;

    public static RegisterFcmTokenResponse register(){
        return RegisterFcmTokenResponse.builder()
                .message("fcmToken 저장 성공")
                .build();
    }
}
