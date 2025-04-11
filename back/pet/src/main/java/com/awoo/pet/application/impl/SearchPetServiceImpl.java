package com.awoo.pet.application.impl;

import com.awoo.pet.application.SearchPetService;
import com.awoo.pet.application.exception.ApplicationErrorCode;
import com.awoo.pet.application.exception.PetNotFoundException;
import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.domain.pet.PetRepository;
import com.awoo.pet.domain.pet.PetSavingGrade;
import com.awoo.pet.domain.walk.WalkRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SearchPetServiceImpl implements SearchPetService {

    private final PetRepository petRepository;
    private final WalkRepository walkRepository;

    @Override
    @Transactional
    public Map<String, Object> searchPet(final Integer petId){

        Map<String, Object> result = new HashMap<>();
        Pet pet = petRepository.searchPet(petId).orElseThrow(() -> new PetNotFoundException(ApplicationErrorCode.PET_NOT_FOUND));
        Integer walkInMonth = walkRepository.searchWalkInMonth(petId).size();
        String grade = null;

        if(pet.getSavingLevel()<=3){
            grade = PetSavingGrade.ONE.getValue();
        }

        if(pet.getSavingLevel()>3 && pet.getSavingLevel()<=7){
            grade = PetSavingGrade.TWO.getValue();
        }

        if(pet.getSavingLevel()>7){
            grade = PetSavingGrade.THREE.getValue();
        }

        result.put("pet", pet);
        result.put("walkInMonth", walkInMonth);
        result.put("grade", grade);

        return result;
    }
}
