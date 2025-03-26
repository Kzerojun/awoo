package com.awoo.calendar.application.impl;

import com.awoo.calendar.application.SearchCalendarService;
import com.awoo.calendar.application.exception.AccessDeniedException;
import com.awoo.calendar.application.exception.ApplicationErrorCode;
import com.awoo.calendar.application.exception.CalendarSearchException;
import com.awoo.calendar.application.exception.PetNotFoundException;
import com.awoo.calendar.domain.Calendar;
import com.awoo.calendar.domain.CalendarRepository;
import com.awoo.calendar.support.ApiUtils;
import com.awoo.calendar.support.client.PetClient;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SearchCalendarServiceImpl implements SearchCalendarService {

    private final PetClient petClient;
    private final CalendarRepository calendarRepository;
    private final ObjectMapper objectMapper;

    @Override
    public Map<String, Object> searchCalendar(Integer calendarId, Integer memberId) {

        Calendar calendar = calendarRepository.searchCalendar(calendarId).orElseThrow(CalendarSearchException::new);

        if(calendar.getMemberId() != memberId){
            throw new AccessDeniedException();
        }

        ApiUtils.ApiResult<?> petResponse = petClient.getPetInfo(calendar.getPetId());

        if(petResponse.getResponse() == null) {
            throw new PetNotFoundException();
        }

        Map<String, Object> petData = objectMapper.convertValue(petResponse.getResponse(), Map.class);

        String petName = (String) petData.get("name");
        String petProfileImage = (String) petData.get("profileImage");

        Map<String, Object> calendarData = new HashMap<>();
        calendarData.put("calendarInfo", calendar);
        calendarData.put("petName", petName);
        calendarData.put("petProfileImage", petProfileImage);

        return calendarData;
    }
}
