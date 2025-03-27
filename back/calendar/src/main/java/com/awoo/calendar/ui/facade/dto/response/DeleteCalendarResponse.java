package com.awoo.calendar.ui.facade.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DeleteCalendarResponse {

    private int calendarId;
    private String message;

    public static DeleteCalendarResponse fromEntity(Integer calendarId) {
        return DeleteCalendarResponse.builder()
                .calendarId(calendarId)
                .message("일정 삭제 완료 되었습니다.")
                .build();
    }
}
