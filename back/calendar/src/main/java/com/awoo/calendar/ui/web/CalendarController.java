package com.awoo.calendar.ui.web;

import com.awoo.calendar.support.ApiUtils;
import com.awoo.calendar.ui.facade.CalendarFacade;
import com.awoo.calendar.ui.facade.dto.request.ModifyCalendarRequest;
import com.awoo.calendar.ui.facade.dto.request.RegisterCalendarRequest;
import com.awoo.calendar.ui.facade.dto.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calendars")
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarFacade calendarFacade;

    @PostMapping
    public ApiUtils.ApiResult<RegisterCalendarResponse> registerCalendar(@RequestHeader("X-User-Id") Integer memberId,
                                                                         @RequestBody RegisterCalendarRequest request){
        return ApiUtils.success(calendarFacade.registerCalendar(request, memberId));
    }

    @GetMapping("/{calendarId}")
    public ApiUtils.ApiResult<SearchCalendarResponse> searchCalendar(@RequestHeader("X-User-Id") Integer memberId,
                                                                     @PathVariable Integer calendarId){
        return ApiUtils.success(calendarFacade.searchCalendar(calendarId, memberId));
    }

    @GetMapping
    public ApiUtils.ApiResult<SearchCalendarListResponse> searchCalendarList(@RequestHeader("X-User-Id") Integer memberId){
        return ApiUtils.success(calendarFacade.searchCalendarList(memberId));
    }

    @PutMapping("/{calendarId}")
    public ApiUtils.ApiResult<ModifyCalendarResponse> modifyCalendar(@RequestHeader("X-User-Id") Integer memberId,
                                                                     @PathVariable Integer calendarId,
                                                                     @RequestBody ModifyCalendarRequest request){
        return ApiUtils.success(calendarFacade.modifyCalendar(request, calendarId, memberId));
    }

    @DeleteMapping("/{calendarId}")
    public ApiUtils.ApiResult<DeleteCalendarResponse> modifyCalendar(@RequestHeader("X-User-Id") Integer memberId,
                                                                     @PathVariable Integer calendarId){
        return ApiUtils.success(calendarFacade.deleteCalendar(calendarId, memberId));
    }

}
