package com.awoo.pet.application;

import com.awoo.pet.domain.pet.Pet;

import java.util.List;

public interface SearchPetListService {

    List<Pet> searchPetList(final Integer memberId);
}
