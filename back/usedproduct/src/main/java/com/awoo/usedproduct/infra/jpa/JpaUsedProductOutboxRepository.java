package com.awoo.usedproduct.infra.jpa;

import com.awoo.usedproduct.application.UsedProductOutboxRepository;
import com.awoo.usedproduct.domain.UsedProductOutbox;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JpaUsedProductOutboxRepository extends JpaRepository<UsedProductOutbox,Integer>, UsedProductOutboxRepository {

    default List<UsedProductOutbox> read() {
        return findByStatus(UsedProductOutbox.Status.PENDING);
    }
}
