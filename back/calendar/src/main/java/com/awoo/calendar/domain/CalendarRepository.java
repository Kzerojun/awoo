package com.awoo.calendar.domain;

import java.util.List;
import java.util.Optional;

public interface CalendarRepository {
    void registerCalendar(Calendar calendar);

    Optional<Calendar> searchCalendar(Integer calendarId);

    List<Calendar> searchCalendarList(Integer memberId);

}
