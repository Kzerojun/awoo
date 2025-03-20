package com.awoo.pet.ui.facade.dto.response;

import com.awoo.pet.domain.pet.Pet;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class SearchPetListResponse {

    private List<SearchPetResponse> pets;

    public static SearchPetListResponse fromEntity(List<Pet> entities){
        return SearchPetListResponse.builder()
                .pets(entities.stream().map(SearchPetResponse::fromEntity).collect(Collectors.toList()))
                .build();
    }
}
