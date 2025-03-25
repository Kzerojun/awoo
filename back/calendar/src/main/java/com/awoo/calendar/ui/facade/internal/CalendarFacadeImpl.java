package com.awoo.calendar.ui.facade.internal;

import com.awoo.calendar.application.RegisterCalendarService;
import com.awoo.calendar.application.SearchCalendarService;
import com.awoo.calendar.application.command.RegisterCalendarCommand;
import com.awoo.calendar.domain.Calendar;
import com.awoo.calendar.ui.facade.CalendarFacade;
import com.awoo.calendar.ui.facade.dto.request.RegisterCalendarRequest;
import com.awoo.calendar.ui.facade.dto.response.RegisterCalendarResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CalendarFacadeImpl implements CalendarFacade {

    private final RegisterCalendarService registerCalendarService;
    private final SearchCalendarService searchCalendarService;

    @Override
    public RegisterCalendarResponse registerCalendar(final RegisterCalendarRequest request, final Integer memberId) {
        Integer calendarId = registerCalendarService.registerCalender(request.toCommand(memberId));
        Calendar calendar = searchCalendarService.searchCalendar(calendarId);
        return mapper.registerCalendar(calendar);
    }
}
