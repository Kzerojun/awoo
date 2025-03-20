package com.awoo.pet.ui.facade.dto.response;

import com.awoo.pet.domain.walk.Walk;
import com.awoo.pet.ui.facade.dto.response.common.WalkResponse;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterWalkResponse {

    private WalkResponse walkResponse;

    public static RegisterWalkResponse fromEntity(Walk entity){
        return RegisterWalkResponse.builder()
                .walkResponse(WalkResponse.fromEntity(entity))
                .build();
    }

}
