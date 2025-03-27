package com.awoo.calendar.application.impl;

import com.awoo.calendar.application.SearchCalendarListService;
import com.awoo.calendar.application.exception.PetNotFoundException;
import com.awoo.calendar.domain.Calendar;
import com.awoo.calendar.domain.CalendarRepository;
import com.awoo.calendar.support.ApiUtils;
import com.awoo.calendar.support.client.PetClient;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SearchCalendarListServiceImpl implements SearchCalendarListService {

    private final PetClient petClient;
    private final ObjectMapper objectMapper;
    private final CalendarRepository calendarRepository;


    @Override
    public List<Map<String, Object>> searchCalendarList(Integer memberId) {

        ApiUtils.ApiResult<?> petListResponse = petClient.getPetList(memberId);

        Map<String, Object> petList = objectMapper.convertValue(petListResponse.getResponse(), Map.class);
        List<Map<String, Object>> pets = (List<Map<String, Object>>) petList.get("pets");

        Map<Integer, Map<String, Object>> petInfo = new HashMap<>();
        for(Map<String, Object> pet : pets){
            petInfo.put((Integer) pet.get("petId"), pet);
        }

        List<Calendar> myCalendarList = calendarRepository.searchCalendarList(memberId);

        List<Map<String, Object>> result = new ArrayList<>();

        for(int i=0; i<myCalendarList.size(); i++){
            Map<String, Object> temp = new HashMap<>();
            Calendar calendar = myCalendarList.get(i);
            temp.put("calendarInfo", calendar);
            temp.put("petName", (String) petInfo.get(calendar.getPetId()).get("name"));
            temp.put("petProfileImage", (String) petInfo.get(calendar.getPetId()).get("profileImage"));
            result.add(temp);
        }

        System.out.println(result);
        return result;

    }
}
