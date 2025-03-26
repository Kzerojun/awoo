package com.awoo.calendar.ui.facade.dto.response;

import com.awoo.calendar.domain.Calendar;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class RegisterCalendarResponse {

    private int calendarId;
    private int memberId;
    private int petId;
    private String scheduleContent;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String color;


    public static RegisterCalendarResponse fromEntity(Calendar calendar) {
        return RegisterCalendarResponse.builder()
                .calendarId(calendar.getCalendarId())
                .memberId(calendar.getMemberId())
                .petId(calendar.getPetId())
                .scheduleContent(calendar.getScheduleContent())
                .startTime(calendar.getStartTime())
                .endTime(calendar.getEndTime())
                .build();
    }
}
