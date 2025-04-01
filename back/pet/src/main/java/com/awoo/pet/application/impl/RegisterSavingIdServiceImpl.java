package com.awoo.pet.application.impl;

import com.awoo.pet.application.RegisterSavingIdService;
import com.awoo.pet.application.exception.ApplicationErrorCode;
import com.awoo.pet.application.exception.PetModifyException;
import com.awoo.pet.application.exception.PetNotFoundException;
import com.awoo.pet.application.exception.RegisterSavingIdException;
import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.domain.pet.PetRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegisterSavingIdServiceImpl implements RegisterSavingIdService {

    private final PetRepository petRepository;

    @Override
    @Transactional
    public void registerSavingId(Integer petId, Integer savingId) {
        Pet entity = petRepository.searchPet(petId).orElseThrow(() -> new PetNotFoundException(ApplicationErrorCode.PET_NOT_FOUND));

        try{
            entity.registerSavingId(savingId);
        }catch(Exception e){
            throw new RegisterSavingIdException(ApplicationErrorCode.SAVING_ID_REGISTER_FAILED);
        }

    }


}
