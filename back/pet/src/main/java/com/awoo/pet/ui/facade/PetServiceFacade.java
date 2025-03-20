package com.awoo.pet.ui.facade;

import com.awoo.pet.ui.facade.dto.request.ModifyPetRequest;
import com.awoo.pet.ui.facade.dto.request.RegisterPetRequest;
import com.awoo.pet.ui.facade.dto.response.ModifyPetResponse;
import com.awoo.pet.ui.facade.dto.response.RegisterPetResponse;
import com.awoo.pet.ui.facade.dto.response.SearchPetListResponse;
import com.awoo.pet.ui.facade.dto.response.SearchPetResponse;

import java.util.List;

public interface PetServiceFacade {

    RegisterPetResponse registerPet(final RegisterPetRequest registerPetRequest, final Integer memberId);

    SearchPetListResponse searchPetList(final Integer memberId);

    SearchPetResponse searchPet(final Integer petId);

    ModifyPetResponse modifyPet(final ModifyPetRequest modifyPetRequest, final Integer petId, Integer memberId);

}
