package com.awoo.alarm.ui.facade.dto.request;

import com.awoo.alarm.application.command.FcmSendCommand;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FcmSendDto {

    private String token;

    private String title;

    private String body;

    @Builder
    public FcmSendDto(String token, String title, String body) {
        this.token = token;
        this.title = title;
        this.body = body;
    }

    public FcmSendCommand toCommand() {
        return new FcmSendCommand(token, title, body);
    }

}
