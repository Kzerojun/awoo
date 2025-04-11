package com.awoo.pet.application;

import com.awoo.pet.domain.walk.Walk;

public interface SearchWalkService {

    Walk searchWalk(Integer walkId);
}
