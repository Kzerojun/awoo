package com.awoo.pet.infra;

import com.awoo.pet.domain.walk.Walk;
import com.awoo.pet.domain.walk.WalkRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaWalkRepository extends JpaRepository<Walk, Integer>, WalkRepository {
}
