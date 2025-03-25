package com.awoo.payment.infra.client.request;

import com.awoo.payment.infra.client.SSAFYFinanceCommonHeader;
import lombok.Builder;

public record SSAFYVerifyOneWonRequest(SSAFYFinanceCommonHeader Header, String accountNo, String authText, String authCode) {

	@Builder
	public SSAFYVerifyOneWonRequest{

	}

}
