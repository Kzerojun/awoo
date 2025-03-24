package com.awoo.pet.domain.walk;

import java.util.List;
import java.util.Optional;

public interface WalkRepository {

    void registerWalk(Walk walk);

    Optional<Walk> searchWalk(Integer walkId);

    List<Walk> searchWalkListByPet(Integer petId);

    List<Walk> searchWalkListByMember(Integer memberId);
}
