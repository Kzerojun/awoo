package com.awoo.calendar.application;

import java.util.List;
import java.util.Map;

public interface SearchCalendarListService {

    List<Map<String, Object>> searchCalendarList(Integer memberId);
}
