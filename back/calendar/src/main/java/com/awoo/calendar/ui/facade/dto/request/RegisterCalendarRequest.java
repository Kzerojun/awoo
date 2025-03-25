package com.awoo.calendar.ui.facade.dto.request;

import com.awoo.calendar.application.command.RegisterCalendarCommand;
import com.awoo.calendar.application.command.common.CalendarCommand;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterCalendarRequest {

    private int petId;
    private String scheduleContent;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String color;

    public RegisterCalendarCommand toCommand(Integer memberId) {
        return new RegisterCalendarCommand(
                CalendarCommand.builder()
                        .memberId(memberId)
                        .petId(petId)
                        .scheduleContent(scheduleContent)
                        .startTime(startTime)
                        .endTime(endTime)
                        .color(color)
                        .build()
        );
    }

}
