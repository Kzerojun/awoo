package com.awoo.account.application.dto;

import com.awoo.account.infra.ssafyfinance.SSAFYFinanceCommonHeader;


public record AccountCreateRequestDto(SSAFYFinanceCommonHeader header, String accountTypeUniqueNo) {

}
