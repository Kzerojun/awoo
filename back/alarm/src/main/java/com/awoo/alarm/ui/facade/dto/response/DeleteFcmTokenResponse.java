package com.awoo.alarm.ui.facade.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DeleteFcmTokenResponse {

    private String message;

    public static DeleteFcmTokenResponse delete(){
        return DeleteFcmTokenResponse.builder()
                .message("fcmToken 삭제 성공")
                .build();
    }
}
