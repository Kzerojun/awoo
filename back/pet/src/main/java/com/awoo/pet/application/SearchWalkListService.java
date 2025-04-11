package com.awoo.pet.application;

import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.domain.walk.Walk;

import java.util.List;

public interface SearchWalkListService {

    List<Walk> searchWalkListByPet(final Integer petId);

    List<Walk> searchWalkListByMember(final Integer memberId);

}
