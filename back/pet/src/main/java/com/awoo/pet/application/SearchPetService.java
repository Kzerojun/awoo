package com.awoo.pet.application;

import com.awoo.pet.domain.pet.Pet;

import java.util.Map;

public interface SearchPetService {

    Map<String, Object> searchPet(Integer petId);
}
