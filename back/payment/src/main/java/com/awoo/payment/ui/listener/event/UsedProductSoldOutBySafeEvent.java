package com.awoo.payment.ui.listener.event;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

public record UsedProductSoldOutBySafeEvent(@JsonProperty("aggregateId") Integer usedProductId,
                                            Integer price,
                                            Integer sellerId,
                                            Integer buyerId) {

    @Builder
    public UsedProductSoldOutBySafeEvent {

    }
}
