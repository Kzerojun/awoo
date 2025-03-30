package com.awoo.usedproduct.application.query;

import lombok.Builder;

public record FetchUsedProductQuery(Integer usedProductId, Integer memberId) {

	@Builder
	public FetchUsedProductQuery{

	}

}
