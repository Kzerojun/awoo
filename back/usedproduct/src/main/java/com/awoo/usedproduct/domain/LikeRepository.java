package com.awoo.usedproduct.domain;

import java.util.Optional;

public interface LikeRepository {

    LikeEntity save(LikeEntity like);

    Optional<LikeEntity> findByMemberIdAndUsedProductId(Integer memberId, Integer usedProductId);

    void delete(LikeEntity like);

    boolean existsByUsedProductIdAndMemberId(Integer usedProductId, Integer memberId);

}
