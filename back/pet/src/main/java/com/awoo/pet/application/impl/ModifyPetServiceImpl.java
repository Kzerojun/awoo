package com.awoo.pet.application.impl;

import com.awoo.pet.application.ModifyPetService;
import com.awoo.pet.application.command.ModifyPetCommand;
import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.domain.pet.PetRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ModifyPetServiceImpl implements ModifyPetService {

    private final PetRepository petRepository;

    @Override
    @Transactional
    public Pet modifyPet(final ModifyPetCommand command) {
        Pet entity = petRepository.searchPet(command.petId());
        entity.modifyPet(command);
        return entity;
    }
}
