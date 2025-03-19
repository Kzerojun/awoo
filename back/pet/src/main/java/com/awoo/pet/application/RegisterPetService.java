package com.awoo.pet.application;

import com.awoo.pet.application.command.RegisterPetCommand;

public interface RegisterPetService {

    Integer registerPet(RegisterPetCommand command);
}
