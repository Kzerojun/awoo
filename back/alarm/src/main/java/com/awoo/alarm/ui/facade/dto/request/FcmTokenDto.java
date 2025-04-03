package com.awoo.alarm.ui.facade.dto.request;

import com.awoo.alarm.application.command.RegisterFcmTokenCommand;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FcmTokenDto {

    private String token;

    public RegisterFcmTokenCommand toCommand(Integer memberId){
        return new RegisterFcmTokenCommand(memberId, token);
    }

}
