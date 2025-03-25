package com.awoo.calendar.domain;

import java.util.Optional;

public interface CalendarRepository {
    void registerCalendar(Calendar calendar);

    Optional<Calendar> searchCalendar(Integer calendarId);

}
