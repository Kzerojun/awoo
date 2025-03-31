package com.awoo.pet.application.impl;

import com.awoo.pet.application.SearchWalkInMonthService;
import com.awoo.pet.domain.walk.Walk;
import com.awoo.pet.domain.walk.WalkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchWalkInMonthServiceImpl implements SearchWalkInMonthService {

    private final WalkRepository walkRepository;

    @Override
    public List<Walk> searchWalkInMonth(Integer petId) {
        return walkRepository.searchWalkInMonth(petId);
    }
}
