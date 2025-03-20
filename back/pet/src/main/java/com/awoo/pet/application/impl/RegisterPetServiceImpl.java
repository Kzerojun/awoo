package com.awoo.pet.application.impl;

import com.awoo.pet.application.RegisterPetService;
import com.awoo.pet.application.command.RegisterPetCommand;
import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.domain.pet.PetFactory;
import com.awoo.pet.domain.pet.PetRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegisterPetServiceImpl implements RegisterPetService {

    private final PetFactory petFactory;
    private final PetRepository petRepository;

    @Override
    @Transactional
    public Integer registerPet(final RegisterPetCommand command) {
        Pet entity = petFactory.registerPetEntity(command);
        petRepository.registerPet(entity);
        System.out.println(entity.getPetId());
        return entity.getPetId();
    }
}
