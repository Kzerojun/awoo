package com.awoo.calendar.ui.facade.dto.request;

import com.awoo.calendar.application.command.RegisterCalendarCommand;
import com.awoo.calendar.application.command.common.CalendarCommand;
import com.awoo.calendar.ui.exception.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterCalendarRequest {

    private Integer petId;
    private String scheduleContent;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String color;

    public RegisterCalendarCommand toCommand(Integer memberId) {
        validate();
        return new RegisterCalendarCommand(
                CalendarCommand.builder()
                        .memberId(memberId)
                        .petId(petId)
                        .scheduleContent(scheduleContent)
                        .startTime(startTime)
                        .endTime(endTime)
                        .color(color)
                        .build()
        );
    }

    private void validate() {

        if(petId == null){
            throw new PetIdRequiredException();
        }

        if(scheduleContent == null){
            throw new ContentRequiredException();
        }

        if(startTime == null){
            throw new StartTimeRequiredException();
        }

        if(endTime == null){
            throw new EndTimeRequiredException();
        }

        if(startTime.isAfter(endTime)){
            throw new TimeInvalidFormatException();
        }

    }

}
