package com.awoo.calendar.ui.facade.internal;

import com.awoo.calendar.application.*;
import com.awoo.calendar.application.command.RegisterCalendarCommand;
import com.awoo.calendar.domain.Calendar;
import com.awoo.calendar.ui.facade.CalendarFacade;
import com.awoo.calendar.ui.facade.dto.request.ModifyCalendarRequest;
import com.awoo.calendar.ui.facade.dto.request.RegisterCalendarRequest;
import com.awoo.calendar.ui.facade.dto.response.*;
import com.awoo.calendar.ui.facade.internal.mapper.CalendarResponseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class CalendarFacadeImpl implements CalendarFacade {

    private final RegisterCalendarService registerCalendarService;
    private final SearchCalendarService searchCalendarService;
    private final SearchCalendarListService searchCalendarListService;
    private final ModifyCalendarService modifyCalendarService;
    private final DeleteCalendarService deleteCalendarService;
    private final CalendarResponseMapper mapper;

    @Override
    public RegisterCalendarResponse registerCalendar(final RegisterCalendarRequest request, final Integer memberId) {
        Calendar calendar = registerCalendarService.registerCalender(request.toCommand(memberId));
        return mapper.registerCalendar(calendar);
    }

    @Override
    public SearchCalendarResponse searchCalendar(final Integer calendarId, final Integer memberId) {
        Map<String, Object> calendarData = searchCalendarService.searchCalendar(calendarId, memberId);
        return mapper.searchCalendar(calendarData);
    }

    @Override
    public SearchCalendarListResponse searchCalendarList(final Integer memberId) {
        List<Map<String, Object>> calendarDataList = searchCalendarListService.searchCalendarList(memberId);
        return mapper.searchCalendarList(calendarDataList);
    }

    @Override
    public ModifyCalendarResponse modifyCalendar(ModifyCalendarRequest request, Integer calendarId, Integer memberId) {
        Calendar modifyCalendar = modifyCalendarService.modifyCalendar(request.toCommand(calendarId, memberId));
        Map<String, Object> calendarData = searchCalendarService.searchCalendar(calendarId, memberId);
        return mapper.modifyCalendar(calendarData);
    }

    @Override
    public DeleteCalendarResponse deleteCalendar(Integer calendarId, Integer memberId) {
        return mapper.deleteCalendar(deleteCalendarService.deleteCalendar(calendarId, memberId));
    }

}
