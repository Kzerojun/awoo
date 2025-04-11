package com.awoo.calendar.ui.facade.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Data
@Builder
public class SearchCalendarListResponse {

    private List<SearchCalendarResponse> calendarList;

    public static SearchCalendarListResponse fromEntity(final List<Map<String, Object>> calendarListData){
        return  SearchCalendarListResponse.builder()
                .calendarList(calendarListData.stream().map(SearchCalendarResponse::fromEntity).collect(Collectors.toList()))
                .build();
    }
}
