package com.awoo.pet.ui.facade.dto.response;

import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.ui.facade.dto.response.common.PetResponse;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SearchPetResponse {

    private PetResponse petResponse;

    public static SearchPetResponse fromEntity(Pet entity){
        return SearchPetResponse.builder()
                .petResponse(PetResponse.fromEntity(entity))
                .build();
    }

}
