package com.awoo.pet.infra;

import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.domain.walk.Walk;
import com.awoo.pet.domain.walk.WalkRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JpaWalkRepository extends JpaRepository<Walk, Integer>, WalkRepository {

    Optional<Walk> findByWalkId(Integer walkId);
    List<Walk> findByPetId(Integer petId);
    List<Walk> findByMemberId(Integer petId);
    @Query(value = "SELECT * FROM walk " +
            "WHERE start_time BETWEEN DATE_FORMAT(CURRENT_DATE, '%Y-%m-01') " +
            "AND LAST_DAY(CURRENT_DATE) " +
            "AND TIMESTAMPDIFF(SECOND, start_time, end_time) >= 1800 " +
            "AND distance >= 1.5 " +
            "AND pet_id = :petId",
            nativeQuery = true)
    List<Walk> findByConditions(@Param("petId") Integer petId);

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

    @Override
    default List<Walk> searchWalkInMonth(Integer petId) {
        return findByConditions(petId);
    }


}
