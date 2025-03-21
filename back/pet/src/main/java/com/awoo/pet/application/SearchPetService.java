package com.awoo.pet.application;

import com.awoo.pet.domain.pet.Pet;

public interface SearchPetService {

    Pet searchPet(Integer petId);
}
