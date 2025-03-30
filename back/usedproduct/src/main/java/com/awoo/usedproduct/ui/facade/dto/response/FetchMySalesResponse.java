package com.awoo.usedproduct.ui.facade.dto.response;

import com.awoo.usedproduct.domain.UsedProductEntity;
import java.util.List;

public record FetchMySalesResponse(List<FetchMySaleResponse> sales) {


	public static FetchMySalesResponse fromEntity(List<UsedProductEntity> entities) {
		List<FetchMySaleResponse> responses = entities.stream()
				.map(entity -> FetchMySaleResponse.builder()
						.usedProductId(entity.getUsedProductId())
						.imageUrl(entity.getImages().isEmpty() ? null : entity.getImages().get(0).getImageUrl())
						.price(entity.getPrice())
						.createdAt(entity.getCreatedAt())
						.status(entity.getUsedProductStatus())
						.build()
				)
				.toList();

		return new FetchMySalesResponse(responses);
	}

}
