package com.awoo.pet.application.impl;

import com.awoo.pet.application.SearchPetListService;
import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.domain.pet.PetRepository;
import com.awoo.pet.domain.pet.PetSavingGrade;
import com.awoo.pet.domain.walk.WalkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SearchPetListServiceImpl implements SearchPetListService {

    private final PetRepository petRepository;
    private final WalkRepository walkRepository;

    @Override
    public List<Map<String, Object>> searchPetList(Integer memberId) {

        List<Map<String, Object>> result = new ArrayList<>();

        List<Pet> petList = petRepository.searchPetList(memberId);

        for(int i=0; i<petList.size(); i++){
            Map<String, Object> temp = new HashMap<>();

            Pet pet = petList.get(i);
            Integer walkInMonth = walkRepository.searchWalkInMonth(pet.getPetId()).size();
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
            temp.put("pet", pet);
            temp.put("walkInMonth", walkInMonth);
            temp.put("grade", grade);

            result.add(temp);
        }

        return result;
    }
}
