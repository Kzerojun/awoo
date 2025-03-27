package com.awoo.usedproduct.domain;

import java.util.Optional;

public interface UsedProductRepository {

    void store(UsedProductEntity entity);

    Optional<UsedProductEntity> findById(Integer id);
}
