package com.awoo.pet.ui.facade.dto.request;

import com.awoo.pet.application.command.RegisterWalkCommand;
import com.awoo.pet.application.command.common.WalkCommand;
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

}
