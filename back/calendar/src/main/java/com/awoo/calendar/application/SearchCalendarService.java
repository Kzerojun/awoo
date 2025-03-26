package com.awoo.calendar.application;

import com.awoo.calendar.domain.Calendar;

import java.util.Map;

public interface SearchCalendarService {

    Map<String, Object> searchCalendar(Integer calendarId, Integer memberIdI);

}
