package com.awoo.pet.infra;

import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.domain.walk.Walk;
import com.awoo.pet.domain.walk.WalkRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JpaWalkRepository extends JpaRepository<Walk, Integer>, WalkRepository {

    Optional<Walk> findByWalkId(Integer walkId);
    List<Walk> findByPetId(Integer petId);
    List<Walk> findByMemberId(Integer petId);

    @Override
    default void registerWalk(Walk walk) {
        save(walk);
    }

    @Override
    default Optional<Walk> searchWalk(Integer walkId) {
        return findByWalkId(walkId);
    }

    @Override
    default List<Walk> searchWalkListByPet(Integer petId) {
        return findByPetId(petId);
    }

    @Override
    default List<Walk> searchWalkListByMember(Integer memberId) {
        return findByMemberId(memberId);
    }
}
