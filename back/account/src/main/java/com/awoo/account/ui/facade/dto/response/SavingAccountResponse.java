package com.awoo.account.ui.facade.dto.response;

import com.awoo.account.infra.ssafyfinance.request.SSAFYSavingAccountDto;
import lombok.Builder;

@Builder
public record SavingAccountResponse(
        String bankCode,
        String bankName,
        String userName,
        String accountNo,
        String accountName,
        String accountDescription,
        String withdrawalBankCode,
        String withdrawalBankName,
        String withdrawalAccountNo,
        String subscriptionPeriod,
        String depositBalance,
        String interestRate,
        String installmentNumber,
        String totalBalance,
        String accountCreateDate,
        String accountExpiryDate,
        Integer petId
) {
    public static SavingAccountResponse from(SSAFYSavingAccountDto dto, Integer petId) {
        return SavingAccountResponse.builder()
                .bankCode(dto.bankCode())
                .bankName(dto.bankName())
                .userName(dto.userName())
                .accountNo(dto.accountNo())
                .accountName(dto.accountName())
                .accountDescription(dto.accountDescription())
                .withdrawalBankCode(dto.withdrawalBankCode())
                .withdrawalBankName(dto.withdrawalBankName())
                .withdrawalAccountNo(dto.withdrawalAccountNo())
                .subscriptionPeriod(dto.subscriptionPeriod())
                .depositBalance(dto.depositBalance())
                .interestRate(dto.interestRate())
                .installmentNumber(dto.installmentNumber())
                .totalBalance(dto.totalBalance())
                .accountCreateDate(dto.accountCreateDate())
                .accountExpiryDate(dto.accountExpiryDate())
                .petId(petId)
                .build();
    }
}

