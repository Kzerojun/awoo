package com.awoo.calendar.application;

import com.awoo.calendar.application.command.RegisterCalendarCommand;
import com.awoo.calendar.domain.Calendar;

public interface RegisterCalendarService {

    Calendar registerCalender(RegisterCalendarCommand command);
}
