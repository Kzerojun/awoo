package com.awoo.payment.infra.client.request;

import com.awoo.payment.infra.client.SSAFYFinanceCommonHeader;
import lombok.Builder;

public record SSAFYDepositRequest(SSAFYFinanceCommonHeader Header, String accountNo, Long transactionBalance, String transactionSummary) {

	@Builder
	public SSAFYDepositRequest{

	}
}
