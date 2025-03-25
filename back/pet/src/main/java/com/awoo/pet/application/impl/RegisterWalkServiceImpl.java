package com.awoo.pet.application.impl;


import com.awoo.pet.application.RegisterWalkService;
import com.awoo.pet.application.command.RegisterWalkCommand;
import com.awoo.pet.application.exception.ApplicationErrorCode;
import com.awoo.pet.application.exception.PetNotFoundException;
import com.awoo.pet.application.exception.WalkRegisterException;
import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.domain.pet.PetRepository;
import com.awoo.pet.domain.walk.Walk;
import com.awoo.pet.domain.walk.WalkFactory;
import com.awoo.pet.domain.walk.WalkRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegisterWalkServiceImpl implements RegisterWalkService {

    private final WalkFactory walkFactory;
    private final WalkRepository walkRepository;
    private final PetRepository petRepository;

    @Override
    @Transactional
    public Integer registerWalk(final RegisterWalkCommand command) {
        petRepository.searchPet(command.walkCommand().petId()).orElseThrow(() -> new PetNotFoundException(ApplicationErrorCode.PET_NOT_FOUND));
        Walk entity = walkFactory.registerWalk(command);
        try{
            walkRepository.registerWalk(entity);
        }catch(Exception e){
            throw new WalkRegisterException(ApplicationErrorCode.WALk_REGISTRATION_FAILED);
        }

        return entity.getWalkId();
    }
}
