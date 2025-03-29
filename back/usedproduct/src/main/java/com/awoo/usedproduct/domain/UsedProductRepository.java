package com.awoo.usedproduct.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface UsedProductRepository {

    void store(UsedProductEntity entity);

    Optional<UsedProductEntity> findById(Integer id);

    Page<UsedProductEntity> findByStatusIn(List<Status> statuses, Pageable pageable);

    void delete(UsedProductEntity entity);
}
