package com.awoo.pet.domain.pet;

public interface PetRepository {

    void registerPet(Pet pet);

    Pet searchPet(Integer petId);
}
