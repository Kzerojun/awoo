package com.awoo.pet.domain.pet;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface PetRepository {

    List<Pet> findAllByPetIdIn(Set<Integer> petIds);

    void registerPet(Pet pet);

    Optional<Pet> searchPet(Integer petId);

    List<Pet> searchPetList(Integer memberId);

}
