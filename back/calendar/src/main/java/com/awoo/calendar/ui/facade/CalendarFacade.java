package com.awoo.calendar.ui.facade;

import com.awoo.calendar.ui.facade.dto.request.RegisterCalendarRequest;
import com.awoo.calendar.ui.facade.dto.response.RegisterCalendarResponse;

public interface CalendarFacade {

    RegisterCalendarResponse registerCalendar(final RegisterCalendarRequest registerRequest, final Integer memberId);
}
