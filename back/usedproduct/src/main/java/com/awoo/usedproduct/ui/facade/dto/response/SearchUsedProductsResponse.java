package com.awoo.usedproduct.ui.facade.dto.response;

import java.util.List;
import lombok.Builder;

public record SearchUsedProductsResponse(List<UsedProductResponse> usedProducts) {

	@Builder
	public SearchUsedProductsResponse{

	}
}
