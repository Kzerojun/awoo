package com.awoo.calendar.application;

import com.awoo.calendar.application.command.RegisterCalendarCommand;

public interface RegisterCalendarService {

    Integer registerCalender(RegisterCalendarCommand command);
}
