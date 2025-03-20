package com.awoo.pet.ui.facade.dto.response.common;

import com.awoo.pet.domain.walk.Walk;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class WalkResponse {

    private int walkId;
    private int memberId;
    private int petId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private double distance;
    private int savingAmount;

    public static WalkResponse fromEntity(Walk entity){
        return WalkResponse.builder()
                .walkId(entity.getWalkId())
                .memberId(entity.getMemberId())
                .petId(entity.getPetId())
                .startTime(entity.getStartTime())
                .endTime(entity.getEndTime())
                .distance(entity.getDistance())
                .savingAmount(entity.getSavedAmount())
                .build();
    }
}
