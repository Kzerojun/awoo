package com.awoo.pet.ui.facade.internal.mapper;

import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.ui.facade.dto.request.ModifyPetRequest;
import com.awoo.pet.ui.facade.dto.response.ModifyPetResponse;
import com.awoo.pet.ui.facade.dto.response.RegisterPetResponse;
import com.awoo.pet.ui.facade.dto.response.SearchPetResponse;
import org.springframework.stereotype.Component;

@Component
public class PetResponseMapper {

    public RegisterPetResponse registerPetResponse(final Pet entity){
        return RegisterPetResponse.fromEntity(entity);
    }

    public SearchPetResponse searchPet(final Pet entity) {
        return SearchPetResponse.fromEntity(entity);
    }

    public ModifyPetResponse modifyPet(final Pet entity) {
        return ModifyPetResponse.fromEntity(entity);
    }
}
