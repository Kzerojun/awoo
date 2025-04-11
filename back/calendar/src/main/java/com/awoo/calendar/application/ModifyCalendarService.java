package com.awoo.calendar.application;

import com.awoo.calendar.application.command.ModifyCalendarCommand;
import com.awoo.calendar.domain.Calendar;

public interface ModifyCalendarService {

    Calendar modifyCalendar(ModifyCalendarCommand command);
}
