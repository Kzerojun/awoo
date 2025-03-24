package com.awoo.account.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SSAFYFinanceApiResponse<T> {
    private SSAFYFinanceCommonHeader Header;
    private List<T> REC;
}
