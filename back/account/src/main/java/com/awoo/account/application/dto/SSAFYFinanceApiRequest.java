package com.awoo.account.application.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SSAFYFinanceApiRequest<T> {
    private SSAFYFinanceCommonHeader Header;
    private T body;  // API마다 달라지는 영역
}
