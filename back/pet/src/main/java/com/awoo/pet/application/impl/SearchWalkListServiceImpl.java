package com.awoo.pet.application.impl;

import com.awoo.pet.application.SearchWalkListService;
import com.awoo.pet.domain.walk.Walk;
import com.awoo.pet.domain.walk.WalkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchWalkListServiceImpl implements SearchWalkListService {

    private final WalkRepository walkRepository;

    @Override
    public List<Walk> searchWalkListByPet(Integer petId) {
        return walkRepository.searchWalkListByPet(petId) ;
    }

    @Override
    public List<Walk> searchWalkListByMember(Integer memberId) {
        return walkRepository.searchWalkListByMember(memberId);
    }
}
