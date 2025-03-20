package com.awoo.pet.application.impl;

import com.awoo.pet.application.SearchPetListService;
import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.domain.pet.PetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchPetListServiceImpl implements SearchPetListService {

    private final PetRepository petRepository;

    @Override
    public List<Pet> searchPetList(Integer memberId) {
        return petRepository.searchPetList(memberId);
    }
}
