package com.awoo.admin.infra.ssafyfinance.request;

import com.awoo.admin.infra.ssafyfinance.SSAFYFinanceCommonHeader;
import lombok.Builder;

public record SSAFYCreateSavingProductRequest(SSAFYFinanceCommonHeader Header,
                                        String bankCode,
                                        String accountName,
                                        String accountDescription,
                                        String subscriptionPeriod,
                                        Long minSubscriptionBalance,
                                        Long maxSubscriptionBalance,
                                        Double interestRate,
                                        String rateDescription
) {
    @Builder
    public SSAFYCreateSavingProductRequest {

    }
}
