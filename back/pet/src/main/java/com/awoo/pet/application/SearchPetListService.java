package com.awoo.pet.application;

import com.awoo.pet.domain.pet.Pet;

import java.util.List;
import java.util.Map;

public interface SearchPetListService {

    List<Map<String, Object>> searchPetList(final Integer memberId);
}
