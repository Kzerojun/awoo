package com.awoo.payment.ui.listener.event;

import lombok.Builder;

public record UsedProductSoldOutBySafeEvent(Integer usedProductId,
                                            Integer price,
                                            Integer sellerId,
                                            Integer buyerId) {

    @Builder
    public UsedProductSoldOutBySafeEvent {

    }
}
