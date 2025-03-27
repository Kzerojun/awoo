package com.awoo.calendar.ui.facade.internal.mapper;

import com.awoo.calendar.domain.Calendar;
import com.awoo.calendar.ui.facade.dto.response.*;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class CalendarResponseMapper {

    public RegisterCalendarResponse registerCalendar(final Calendar calendar) {
        return RegisterCalendarResponse.fromEntity(calendar);
    }

    public SearchCalendarResponse searchCalendar(final Map<String, Object> calendarData) {
        return SearchCalendarResponse.fromEntity(calendarData);
    }

    public SearchCalendarListResponse searchCalendarList(final List<Map<String, Object>> calendarListData){
        return SearchCalendarListResponse.fromEntity(calendarListData);
    }

    public ModifyCalendarResponse modifyCalendar(final Map<String, Object> calendarData) {
        return ModifyCalendarResponse.fromEntity(calendarData);
    }

    public DeleteCalendarResponse deleteCalendar(final Integer calendarId){
        return DeleteCalendarResponse.fromEntity(calendarId);
    }
}
