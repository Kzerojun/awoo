package com.awoo.pet.ui.facade;

import com.awoo.pet.ui.facade.dto.request.RegisterPetRequest;
import com.awoo.pet.ui.facade.dto.response.RegisterPetResponse;

public interface PetServiceFacade {

    RegisterPetResponse registerPet(RegisterPetRequest registerPetRequest);

}
