package com.awoo.usedproduct.infra.jpa;

import com.awoo.usedproduct.domain.LikeEntity;
import com.awoo.usedproduct.domain.LikeRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaLikeRepository extends JpaRepository<LikeEntity,Integer>, LikeRepository {
}
