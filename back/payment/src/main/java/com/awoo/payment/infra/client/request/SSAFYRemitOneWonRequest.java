package com.awoo.payment.infra.client.request;

import com.awoo.payment.infra.client.SSAFYFinanceCommonHeader;
import lombok.Builder;

public record SSAFYRemitOneWonRequest(SSAFYFinanceCommonHeader Header, String accountNo, String authText) {

	@Builder
	public SSAFYRemitOneWonRequest{

	}
}
