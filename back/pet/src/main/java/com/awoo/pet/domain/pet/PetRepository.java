package com.awoo.pet.domain.pet;

import java.util.List;
import java.util.Optional;

public interface PetRepository {

    void registerPet(Pet pet);

    Optional<Pet> searchPet(Integer petId);

    List<Pet> searchPetList(Integer memberId);
}
