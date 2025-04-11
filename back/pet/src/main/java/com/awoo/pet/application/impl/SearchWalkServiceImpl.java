package com.awoo.pet.application.impl;

import com.awoo.pet.application.SearchWalkService;
import com.awoo.pet.application.exception.ApplicationErrorCode;
import com.awoo.pet.application.exception.WalkNotFondException;
import com.awoo.pet.domain.walk.Walk;
import com.awoo.pet.domain.walk.WalkRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SearchWalkServiceImpl implements SearchWalkService {

    private final WalkRepository walkRepository;

    @Override
    @Transactional
    public Walk searchWalk(final Integer walkId) {
        return walkRepository.searchWalk(walkId).orElseThrow(() -> new WalkNotFondException(ApplicationErrorCode.WALK_NOT_FOUND));
    }
}
