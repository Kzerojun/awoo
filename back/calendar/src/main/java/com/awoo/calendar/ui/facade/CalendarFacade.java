package com.awoo.calendar.ui.facade;

import com.awoo.calendar.ui.facade.dto.request.RegisterCalendarRequest;
import com.awoo.calendar.ui.facade.dto.response.RegisterCalendarResponse;
import com.awoo.calendar.ui.facade.dto.response.SearchCalendarListResponse;
import com.awoo.calendar.ui.facade.dto.response.SearchCalendarResponse;

public interface CalendarFacade {

    RegisterCalendarResponse registerCalendar(final RegisterCalendarRequest registerRequest, final Integer memberId);

    SearchCalendarResponse searchCalendar(final Integer calendarId, final Integer memberId);

    SearchCalendarListResponse searchCalendarList(final Integer memberId);

}
