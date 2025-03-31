package com.awoo.calendar.application.command.common;

import com.awoo.calendar.domain.CalendarType;
import lombok.Builder;

import java.time.LocalDateTime;

public record CalendarCommand(int memberId, int petId, String scheduleContent, LocalDateTime startTime, LocalDateTime endTime, String color) {

    @Builder
    public CalendarCommand{

    }
}
