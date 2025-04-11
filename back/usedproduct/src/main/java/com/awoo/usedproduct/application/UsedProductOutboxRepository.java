package com.awoo.usedproduct.application;

import com.awoo.usedproduct.domain.UsedProductOutbox;

import java.util.List;

public interface UsedProductOutboxRepository {

    UsedProductOutbox save(UsedProductOutbox outbox);

    List<UsedProductOutbox> findByStatus(UsedProductOutbox.Status status);

    List<UsedProductOutbox> read();
}
