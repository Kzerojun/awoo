package com.awoo.calendar.ui.facade.dto.response;

import com.awoo.calendar.domain.Calendar;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;


@Data
@Builder
public class ModifyCalendarResponse {

    private int calendarId;
    private int memberId;
    private String petName;
    private String petProfileImage;
    private String scheduleContent;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String color;
    private String calendarType;
    private String delYn;

    public static ModifyCalendarResponse fromEntity(Map<String, Object> calendar) {
        Calendar calendarInfo = (Calendar)calendar.get("calendarInfo");
        return ModifyCalendarResponse.builder()
                .calendarId(calendarInfo.getCalendarId())
                .memberId(calendarInfo.getMemberId())
                .petName((String) calendar.get("petName"))
                .petProfileImage((String) calendar.get("petProfileImage"))
                .scheduleContent(calendarInfo.getScheduleContent())
                .startTime(calendarInfo.getStartTime())
                .endTime(calendarInfo.getEndTime())
                .color(calendarInfo.getColor())
                .calendarType(calendarInfo.getCalendarType().getValue())
                .delYn(calendarInfo.getDelYn())
                .build();
    }

}
