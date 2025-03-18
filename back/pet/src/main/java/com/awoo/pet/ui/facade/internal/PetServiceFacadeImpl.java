package com.awoo.pet.ui.facade.internal;

import com.awoo.pet.ui.facade.PetServiceFacade;
import com.awoo.pet.ui.facade.dto.request.RegisterPetRequest;
import com.awoo.pet.ui.facade.dto.response.RegisterPetResponse;
import org.springframework.stereotype.Component;


@Component
public class PetServiceFacadeImpl implements PetServiceFacade {

    @Override
    public RegisterPetResponse registerPet(final RegisterPetRequest registerPetRequest) {
        return null;
    }
}
