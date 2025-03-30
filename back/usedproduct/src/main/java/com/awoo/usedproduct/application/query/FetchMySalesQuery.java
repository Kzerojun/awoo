package com.awoo.usedproduct.application.query;

import com.awoo.usedproduct.domain.UsedProductStatus;
import java.util.List;
import lombok.Builder;

public record FetchMySalesQuery(Integer memberId, List<UsedProductStatus> status
) {

	@Builder
	public FetchMySalesQuery{

	}

}
