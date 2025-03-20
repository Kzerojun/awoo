package com.awoo.pet.domain.pet;

import java.util.List;

public interface PetRepository {

    void registerPet(Pet pet);

    Pet searchPet(Integer petId);

    List<Pet> searchPetList(Integer memberId);
}
