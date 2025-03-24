package com.awoo.pet.ui.facade.dto.response;

import com.awoo.pet.domain.walk.Walk;
import com.awoo.pet.ui.facade.dto.response.common.WalkResponse;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class RegisterWalkResponse {

    private int walkId;
    private int memberId;
    private int petId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private double distance;

    public static RegisterWalkResponse fromEntity(Walk entity){
        return RegisterWalkResponse.builder()
                .walkId(entity.getWalkId())
                .memberId(entity.getMemberId())
                .petId(entity.getPetId())
                .startTime(entity.getStartTime())
                .endTime(entity.getEndTime())
                .distance(entity.getDistance())
                .build();
    }

}
