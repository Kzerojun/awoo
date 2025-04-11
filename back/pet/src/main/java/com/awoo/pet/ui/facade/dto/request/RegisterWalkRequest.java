package com.awoo.pet.ui.facade.dto.request;

import com.awoo.pet.application.command.RegisterWalkCommand;
import com.awoo.pet.application.command.common.WalkCommand;
import com.awoo.pet.ui.exception.DistanceInvalidFormatException;
import com.awoo.pet.ui.exception.EndTimeRequiredException;
import com.awoo.pet.ui.exception.StartTimeRequiredException;
import com.awoo.pet.ui.exception.TimeInvalidFormatException;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterWalkRequest {

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private double distance;

    public RegisterWalkCommand toCommand(Integer petId, Integer memberId){
        validate();
        return new RegisterWalkCommand(
                WalkCommand.builder()
                        .memberId(memberId)
                        .petId(petId)
                        .startTime(startTime)
                        .endTime(endTime)
                        .distance(distance)
                        .build()
        );
    }

    public void validate(){

        if(startTime == null){
            throw new StartTimeRequiredException();
        }

        if(endTime == null){
            throw new EndTimeRequiredException();
        }

        if(startTime.isAfter(endTime)){
            throw new TimeInvalidFormatException();
        }

        if(distance <= 0){
            throw new DistanceInvalidFormatException();
        }
    }

}
