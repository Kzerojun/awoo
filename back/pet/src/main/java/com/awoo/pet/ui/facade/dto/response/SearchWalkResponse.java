package com.awoo.pet.ui.facade.dto.response;

import com.awoo.pet.domain.walk.Walk;
import com.awoo.pet.ui.facade.dto.response.common.WalkResponse;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SearchWalkResponse {

    private WalkResponse walkResponse;

    public static SearchWalkResponse fromEntity(Walk entity){
        return SearchWalkResponse.builder()
                .walkResponse(WalkResponse.fromEntity(entity))
                .build();
    }
}
