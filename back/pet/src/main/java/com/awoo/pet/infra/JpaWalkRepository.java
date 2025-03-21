package com.awoo.pet.infra;

import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.domain.walk.Walk;
import com.awoo.pet.domain.walk.WalkRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaWalkRepository extends JpaRepository<Walk, Integer>, WalkRepository {

    Optional<Walk> findByWalkId(Integer walkId);

    @Override
    default Optional<Walk> searchWalk(Integer walkId) {
        return findByWalkId(walkId);
    }
}
