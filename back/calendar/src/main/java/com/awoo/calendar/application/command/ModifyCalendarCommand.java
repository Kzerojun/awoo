package com.awoo.calendar.application.command;

import java.time.LocalDateTime;

public record ModifyCalendarCommand(int memberId, int calendarId, int petId, String scheduleContent, LocalDateTime startTime, LocalDateTime endTime, String color) {
}
