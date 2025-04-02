package com.awoo.usedproduct.infra.kafka.event;

import lombok.Builder;

public record UsedProductSoldOutBySafeEvent(Integer usedProductId,
                                            Integer price,
                                            Integer sellerId,
                                            Integer buyerId) {

    @Builder
    public UsedProductSoldOutBySafeEvent {

    }
}
