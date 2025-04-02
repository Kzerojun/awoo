package com.awoo.alarm.domain;


import com.awoo.alarm.application.command.FcmSendCommand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AlarmFactory {

    public Alarm registerAlarmEntity(final FcmSendCommand command,
                                     final String isSend,
                                     final Integer senderId,
                                     final Integer receiverId) {

        return Alarm.builder()
                .title(command.title())
                .body(command.body())
                .senderId(senderId)
                .receiverId(receiverId)
                .isSend(isSend)
                .build();
    }

}
