package com.awoo.pet.application.impl;

import com.awoo.pet.application.SearchPetService;
import com.awoo.pet.application.exception.ApplicationErrorCode;
import com.awoo.pet.application.exception.PetNotFoundException;
import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.domain.pet.PetRepository;
import com.awoo.pet.domain.walk.WalkRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SearchPetServiceImpl implements SearchPetService {

    private final PetRepository petRepository;
    private final WalkRepository walkRepository;

    @Override
    @Transactional
    public Pet searchPet(final Integer petId){
//        Integer walkInMonth = walkRepository.countWalks(petId);

        return petRepository.searchPet(petId).orElseThrow(() -> new PetNotFoundException(ApplicationErrorCode.PET_NOT_FOUND));
    }
}
