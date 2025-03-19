package com.awoo.pet.application;

import com.awoo.pet.application.command.ModifyPetCommand;
import com.awoo.pet.domain.pet.Pet;

public interface ModifyPetService {

    Pet modifyPet(ModifyPetCommand command);
}
