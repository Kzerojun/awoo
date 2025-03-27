package com.awoo.calendar.application.impl;

import com.awoo.calendar.application.DeleteCalendarService;
import com.awoo.calendar.application.exception.AccessDeniedException;
import com.awoo.calendar.application.exception.CalendarDeleteException;
import com.awoo.calendar.application.exception.CalendarModifyException;
import com.awoo.calendar.application.exception.CalendarNotFoundException;
import com.awoo.calendar.domain.Calendar;
import com.awoo.calendar.domain.CalendarRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteCalendarServiceImpl implements DeleteCalendarService {

    private final CalendarRepository calendarRepository;

    @Override
    @Transactional
    public Integer deleteCalendar(Integer calendarId, Integer memberId) {

        Calendar calendar = calendarRepository.searchCalendar(calendarId).orElseThrow(CalendarNotFoundException::new);

        if(calendar.getMemberId() != memberId){
            throw new AccessDeniedException();
        }

        try{
            calendar.delete();
        }catch (Exception e){
            throw new CalendarDeleteException();
        }

        return calendarId;
    }
}
