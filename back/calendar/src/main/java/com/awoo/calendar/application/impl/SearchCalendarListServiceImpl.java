package com.awoo.calendar.application.impl;

import com.awoo.calendar.application.SearchCalendarListService;
import com.awoo.calendar.application.exception.PetNotFoundException;
import com.awoo.calendar.support.ApiUtils;
import com.awoo.calendar.support.client.PetClient;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SearchCalendarListServiceImpl implements SearchCalendarListService {

    private final PetClient petClient;
    private final ObjectMapper objectMapper;


    @Override
    public List<Map<String, Object>> searchCalendarList(Integer memberId) {

        ApiUtils.ApiResult<?> petListResponse = petClient.getPetList(memberId);
        Map<String, Object> petList = objectMapper.convertValue(petListResponse.getResponse(), Map.class);
        List<Map<String, Object>> pets = (List<Map<String, Object>>) petList.get("pets");
        System.out.println(pets);

        if(petListResponse.getResponse() == null) {
            throw new PetNotFoundException();
        }
        System.out.println("확인 요망");
        return null;


    }
}
