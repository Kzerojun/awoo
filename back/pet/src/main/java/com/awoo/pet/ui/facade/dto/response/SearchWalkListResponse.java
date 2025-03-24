package com.awoo.pet.ui.facade.dto.response;

import com.awoo.pet.domain.walk.Walk;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class SearchWalkListResponse {

    private List<SearchWalkResponse> walks;

    public static SearchWalkListResponse fromEntity(List<Walk> entities){
        return SearchWalkListResponse.builder()
                .walks(entities.stream().map(SearchWalkResponse::fromEntity).collect(Collectors.toList()))
                .build();
    }
}
