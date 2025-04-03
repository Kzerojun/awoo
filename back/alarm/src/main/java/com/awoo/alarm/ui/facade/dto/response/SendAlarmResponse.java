package com.awoo.alarm.ui.facade.dto.response;

import com.awoo.alarm.domain.Alarm;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SendAlarmResponse {

    private Long alarmId;
    private String title;
    private String body;
    private Integer senderId;
    private Integer receiverId;
    private String isSend;

    public static SendAlarmResponse fromEntity(Alarm alarm) {

        return SendAlarmResponse.builder()
                .alarmId(alarm.getAlarmId())
                .title(alarm.getTitle())
                .body(alarm.getBody())
                .senderId(alarm.getSenderId())
                .receiverId(alarm.getReceiverId())
                .isSend(alarm.getIsSend())
                .build();
    }
}
