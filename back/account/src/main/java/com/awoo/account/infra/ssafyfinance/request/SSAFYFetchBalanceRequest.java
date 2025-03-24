package com.awoo.account.infra.ssafyfinance.request;

import com.awoo.account.infra.ssafyfinance.SSAFYFinanceCommonHeader;
import lombok.Builder;

public record SSAFYFetchBalanceRequest(SSAFYFinanceCommonHeader Header, String accountNo) {

	@Builder
	public SSAFYFetchBalanceRequest{

	}

}
