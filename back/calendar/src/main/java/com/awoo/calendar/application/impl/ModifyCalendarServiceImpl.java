package com.awoo.calendar.application.impl;

import com.awoo.calendar.application.ModifyCalendarService;
import com.awoo.calendar.application.command.ModifyCalendarCommand;
import com.awoo.calendar.application.exception.AccessDeniedException;
import com.awoo.calendar.application.exception.CalendarModifyException;
import com.awoo.calendar.application.exception.CalendarNotFoundException;
import com.awoo.calendar.domain.Calendar;
import com.awoo.calendar.domain.CalendarRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ModifyCalendarServiceImpl implements ModifyCalendarService {

    private final CalendarRepository calendarRepository;

    @Override
    @Transactional
    public Calendar modifyCalendar(final ModifyCalendarCommand command) {
        Calendar calendar = calendarRepository.searchCalendar(command.calendarId()).orElseThrow(CalendarNotFoundException::new);

        if(calendar.getMemberId() != command.memberId()){
            throw new AccessDeniedException();
        }

        try{
            calendar.modify(command);
        }catch (Exception e){
            throw new CalendarModifyException();
        }
        return calendar;
    }
}
