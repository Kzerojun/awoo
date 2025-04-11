package com.awoo.calendar.ui.facade;

import com.awoo.calendar.ui.facade.dto.request.ModifyCalendarRequest;
import com.awoo.calendar.ui.facade.dto.request.RegisterCalendarRequest;
import com.awoo.calendar.ui.facade.dto.response.*;

public interface CalendarFacade {

    RegisterCalendarResponse registerCalendar(final RegisterCalendarRequest registerRequest, final Integer memberId);

    SearchCalendarResponse searchCalendar(final Integer calendarId, final Integer memberId);

    SearchCalendarListResponse searchCalendarList(final Integer memberId);

    SearchCalendarListResponse searchCalendarListByPet(final Integer petId, final Integer memberId);

    ModifyCalendarResponse modifyCalendar(final ModifyCalendarRequest request, final Integer calendarId, final Integer memberId);

    DeleteCalendarResponse deleteCalendar(final Integer calendarId, final Integer memberId);

}
