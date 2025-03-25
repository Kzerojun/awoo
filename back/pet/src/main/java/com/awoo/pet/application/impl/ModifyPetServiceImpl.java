package com.awoo.pet.application.impl;

import com.awoo.pet.application.ModifyPetService;
import com.awoo.pet.application.command.ModifyPetCommand;
import com.awoo.pet.application.exception.ApplicationErrorCode;
import com.awoo.pet.application.exception.PetModifyException;
import com.awoo.pet.application.exception.PetNotFoundException;
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
        Pet entity = petRepository.searchPet(command.petId()).orElseThrow(() -> new PetNotFoundException(ApplicationErrorCode.PET_NOT_FOUND));
        try{
            entity.modifyPet(command);
        }catch(Exception e){
            throw new PetModifyException(ApplicationErrorCode.PET_MODIFY_FAILED);
        }

        return entity;
    }
}
