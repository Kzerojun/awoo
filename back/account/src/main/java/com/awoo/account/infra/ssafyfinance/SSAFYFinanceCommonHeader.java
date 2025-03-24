package com.awoo.account.infra.ssafyfinance;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SSAFYFinanceCommonHeader {
    private String apiName;
    private String transmissionDate;
    private String transmissionTime;

    @Builder.Default
    private String institutionCode = "00100";

    @Builder.Default
    private String fintechAppNo = "001";

    private String apiServiceCode;
    private String institutionTransactionUniqueNo;
    private String apiKey;
    private String userKey;
}
