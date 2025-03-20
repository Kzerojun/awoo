package com.awoo.pet.ui.facade.dto.response;

import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.ui.facade.dto.response.common.PetResponse;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterPetResponse {

    private PetResponse petResponse;

    public static RegisterPetResponse fromEntity(Pet entity){
        return RegisterPetResponse.builder()
                .petResponse(PetResponse.fromEntity(entity))
                .build();
    }


}
