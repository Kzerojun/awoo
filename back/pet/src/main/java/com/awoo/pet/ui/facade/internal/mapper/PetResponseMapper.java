package com.awoo.pet.ui.facade.internal.mapper;

import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.domain.walk.Walk;
import com.awoo.pet.ui.facade.dto.response.*;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class PetResponseMapper {

    public RegisterPetResponse registerPet(final Pet entity){
        return RegisterPetResponse.fromEntity(entity);
    }

    public SearchPetListResponse searchPetList(final List<Map<String, Object>> pets) {
        return SearchPetListResponse.fromEntity(pets);
    }

    public SearchPetResponse searchPet(final Map<String, Object> petInfo) {
        return SearchPetResponse.fromEntity(petInfo);
    }

    public ModifyPetResponse modifyPet(final Pet entity) {
        return ModifyPetResponse.fromEntity(entity);
    }

    public RegisterWalkResponse registerWalk(final Walk entity) {
        return RegisterWalkResponse.fromEntity(entity);
    }

    public SearchWalkResponse searchWalk(final Walk entity){
        return SearchWalkResponse.fromEntity(entity);
    }

    public SearchWalkListResponse searchWalkList(final List<Walk> walks) {
        return SearchWalkListResponse.fromEntity(walks);
    }
}
