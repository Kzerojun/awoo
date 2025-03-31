package com.awoo.calendar.application;

import java.util.List;
import java.util.Map;

public interface SearchCalendarListByPetService {

    List<Map<String, Object>> searchCalendarListByPetService(Integer memberId, Integer petId);
}
