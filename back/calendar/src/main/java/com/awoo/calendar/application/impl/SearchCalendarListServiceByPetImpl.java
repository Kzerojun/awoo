package com.awoo.calendar.application.impl;

import com.awoo.calendar.application.SearchCalendarListByPetService;
import com.awoo.calendar.application.exception.AccessDeniedException;
import com.awoo.calendar.application.exception.PetNotFoundException;
import com.awoo.calendar.domain.Calendar;
import com.awoo.calendar.domain.CalendarRepository;
import com.awoo.calendar.support.ApiUtils;
import com.awoo.calendar.support.client.PetClient;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SearchCalendarListServiceByPetImpl implements SearchCalendarListByPetService {

    private final PetClient petClient;
    private final ObjectMapper objectMapper;
    private final CalendarRepository calendarRepository;

    @Override
    public List<Map<String, Object>> searchCalendarListByPetService(Integer memberId, Integer petId) {


        ApiUtils.ApiResult<?> petResponse;

        try{
            petResponse = petClient.getPetInfo(petId);
        }catch (Exception e){
            throw new PetNotFoundException();
        }

        Map<String, Object> pet = objectMapper.convertValue(petResponse.getResponse(), Map.class);
        if(!pet.get("memberId").equals(memberId)){
            throw new AccessDeniedException();
        }

        List<Calendar> petCalendarList = calendarRepository.searchCalendarListByPet(petId , "N");

        List<Map<String, Object>> result = new ArrayList<>();

        for(int i=0; i<petCalendarList.size(); i++){
            Map<String, Object> temp = new HashMap<>();
            Calendar calendar = petCalendarList.get(i);
            temp.put("calendarInfo", calendar);
            temp.put("petName", pet.get("name"));
            temp.put("petProfileImage", pet.get("profileImage"));
            result.add(temp);
        }

        return result;
    }

}
