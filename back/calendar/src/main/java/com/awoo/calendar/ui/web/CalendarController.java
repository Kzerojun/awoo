package com.awoo.calendar.ui.web;

import com.awoo.calendar.support.ApiUtils;
import com.awoo.calendar.ui.facade.CalendarFacade;
import com.awoo.calendar.ui.facade.dto.request.RegisterCalendarRequest;
import com.awoo.calendar.ui.facade.dto.response.RegisterCalendarResponse;
import com.awoo.calendar.ui.facade.dto.response.SearchCalendarListResponse;
import com.awoo.calendar.ui.facade.dto.response.SearchCalendarResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calendars")
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarFacade calendarFacade;

    @PostMapping
    public ApiUtils.ApiResult<RegisterCalendarResponse> registerCalendar(@RequestHeader("X-User-Id") Integer memberId, @RequestBody RegisterCalendarRequest request){
        return ApiUtils.success(calendarFacade.registerCalendar(request, memberId));
    }

    @GetMapping("/{calendarId}")
    public ApiUtils.ApiResult<SearchCalendarResponse> searchCalendar(@RequestHeader("X-User-Id") Integer memberId, @PathVariable Integer calendarId){
        return ApiUtils.success(calendarFacade.searchCalendar(calendarId, memberId));
    }

    @GetMapping
    public ApiUtils.ApiResult<SearchCalendarListResponse> searchCalendarList(@RequestHeader("X-User-Id") Integer memberId){
        return ApiUtils.success(calendarFacade.searchCalendarList(memberId));
    }
}
