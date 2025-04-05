package com.awoo.usedproduct.ui.facade.dto.response;

import com.awoo.usedproduct.domain.UsedProductStatus;
import java.time.LocalDateTime;
import lombok.Builder;

public record FetchMySaleResponse(Integer usedProductId,
								  String title,
								  String imageUrl,
								  Integer price,
								  LocalDateTime createdAt,
								  UsedProductStatus status) {

	@Builder
	public FetchMySaleResponse{

	}


}
