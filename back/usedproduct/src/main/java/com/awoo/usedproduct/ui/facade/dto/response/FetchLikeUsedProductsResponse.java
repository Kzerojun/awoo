package com.awoo.usedproduct.ui.facade.dto.response;

import lombok.Builder;

import java.util.List;

public record FetchLikeUsedProductsResponse(List<UsedProductResponse> usedProducts) {

    @Builder
    public FetchLikeUsedProductsResponse {

    }
}
