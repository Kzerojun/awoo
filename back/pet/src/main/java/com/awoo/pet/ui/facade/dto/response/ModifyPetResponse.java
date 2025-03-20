package com.awoo.pet.ui.facade.dto.response;

import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.ui.facade.dto.response.common.PetResponse;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ModifyPetResponse {

    private PetResponse petResponse;

    public static ModifyPetResponse fromEntity(Pet entity){
        return ModifyPetResponse.builder()
                .petResponse(PetResponse.fromEntity(entity))
                .build();
    }
}
