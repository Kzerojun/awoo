package com.awoo.calendar.domain;

import com.awoo.calendar.application.command.RegisterCalendarCommand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CalendarFactory {

    public Calendar registerCalendarEntity(final RegisterCalendarCommand command) {

        CalendarType temp = command.calendarCommand().calendarType();

        if(temp == null) {
            temp = CalendarType.NOMAL;
        }

        return Calendar.builder()
                .memberId(command.calendarCommand().memberId())
                .petId(command.calendarCommand().petId())
                .scheduleContent(command.calendarCommand().scheduleContent())
                .startTime(command.calendarCommand().startTime())
                .endTime(command.calendarCommand().endTime())
                .color(command.calendarCommand().color())
                .calendarType(temp)
                .build();
    }
}
