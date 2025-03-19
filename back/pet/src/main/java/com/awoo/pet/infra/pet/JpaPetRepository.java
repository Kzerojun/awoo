package com.awoo.pet.infra.pet;

import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.domain.pet.PetRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JpaPetRepository extends JpaRepository<Pet, Integer>, PetRepository {

    Optional<Pet> findByPetId(Integer petId);

    @Override
    default void registerPet(Pet pet) {
        save(pet);
    }

    @Override
    default Pet searchPet(Integer petId) {
        return findByPetId(petId).orElse(null);
    }

}
