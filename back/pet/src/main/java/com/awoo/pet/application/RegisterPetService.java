package com.awoo.pet.application;

import com.awoo.pet.application.command.RegisterPetCommand;
import com.awoo.pet.domain.pet.Pet;

public interface RegisterPetService {

    Pet registerPet(RegisterPetCommand command);
}
