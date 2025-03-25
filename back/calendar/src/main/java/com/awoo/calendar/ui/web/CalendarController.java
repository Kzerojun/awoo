package com.awoo.calendar.ui.web;

import com.awoo.calendar.support.ApiUtils;
import com.awoo.calendar.ui.facade.CalendarFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/calendars")
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarFacade calendarFacade;

//    @PostMapping
//    public ApiUtils.ApiResult<>
}
