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
public class ssafyFinanceApiResponse<T> {
    private ssafyFinanceCommonHeader Header;
    private List<T> REC;
}
