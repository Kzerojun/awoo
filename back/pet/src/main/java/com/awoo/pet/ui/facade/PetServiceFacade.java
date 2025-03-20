package com.awoo.pet.ui.facade;

import com.awoo.pet.ui.facade.dto.request.ModifyPetRequest;
import com.awoo.pet.ui.facade.dto.request.RegisterPetRequest;
import com.awoo.pet.ui.facade.dto.request.RegisterWalkRequest;
import com.awoo.pet.ui.facade.dto.response.*;

import java.util.List;

public interface PetServiceFacade {

    RegisterPetResponse registerPet(final RegisterPetRequest registerPetRequest, final Integer memberId);

    SearchPetListResponse searchPetList(final Integer memberId);

    SearchPetResponse searchPet(final Integer petId);

    ModifyPetResponse modifyPet(final ModifyPetRequest modifyPetRequest, final Integer petId, Integer memberId);

    RegisterWalkResponse registerWalk(final RegisterWalkRequest registerWalkRequest, final Integer memberId);
}
