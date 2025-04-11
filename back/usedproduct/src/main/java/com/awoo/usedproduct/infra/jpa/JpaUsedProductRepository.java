package com.awoo.usedproduct.infra.jpa;

import com.awoo.usedproduct.domain.UsedProductEntity;
import com.awoo.usedproduct.domain.UsedProductRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaUsedProductRepository extends JpaRepository<UsedProductEntity,Integer>, UsedProductRepository {

    default void store(UsedProductEntity entity) {
        save(entity);
    }
}
