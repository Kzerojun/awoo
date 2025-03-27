package com.awoo.calendar.application.impl;

import com.awoo.calendar.application.RegisterCalendarService;
import com.awoo.calendar.application.command.RegisterCalendarCommand;
import com.awoo.calendar.application.exception.ApplicationErrorCode;
import com.awoo.calendar.application.exception.CalendarRegisterException;
import com.awoo.calendar.application.exception.PetNotFoundException;
import com.awoo.calendar.domain.Calendar;
import com.awoo.calendar.domain.CalendarFactory;
import com.awoo.calendar.domain.CalendarRepository;
import com.awoo.calendar.support.ApiUtils;
import com.awoo.calendar.support.client.PetClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegisterCalendarServiceImpl implements RegisterCalendarService {

    private final PetClient petClient;
    private final CalendarFactory calendarFactory;
    private final CalendarRepository calendarRepository;

    @Override
    public Calendar registerCalender(RegisterCalendarCommand command) {

        try{
            ApiUtils.ApiResult<?> petResponse = petClient.getPetInfo(command.calendarCommand().petId());
        }catch (Exception e){
            throw new PetNotFoundException();
        }

        Calendar calendar = calendarFactory.registerCalendarEntity(command);

        try{
            calendarRepository.registerCalendar(calendar);
        }catch(Exception e){
            throw new CalendarRegisterException();
        }
        return calendar;
    }
}
