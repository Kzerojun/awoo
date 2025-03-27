package com.awoo.calendar.ui.facade.dto.request;

import com.awoo.calendar.application.command.ModifyCalendarCommand;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ModifyCalendarRequest {

    private int petId;
    private String scheduleContent;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String color;

    public ModifyCalendarCommand toCommand(int calendarId, int memberId) {
        return new  ModifyCalendarCommand(memberId, calendarId, petId, scheduleContent, startTime, endTime, color);
    }
}
