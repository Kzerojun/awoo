package com.awoo.calendar.application.impl;

import com.awoo.calendar.application.SearchCalendarService;
import com.awoo.calendar.application.exception.ApplicationErrorCode;
import com.awoo.calendar.application.exception.CalendarSearchException;
import com.awoo.calendar.domain.Calendar;
import com.awoo.calendar.domain.CalendarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SearchCalendarServiceImpl implements SearchCalendarService {

    private final CalendarRepository calendarRepository;

    @Override
    public Calendar searchCalendar(Integer calendarId) {
        return calendarRepository.searchCalendar(calendarId).orElseThrow(() -> new CalendarSearchException(ApplicationErrorCode.CALENDAR_NOT_FOUND));
    }
}
