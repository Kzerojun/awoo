package com.awoo.account.support;

import lombok.Getter;

@Getter
public enum SSAFYCode {

    //잔액조회
    FETCH_BALANCE("inquireDemandDepositAccountBalance"),
    DEDUCT_BALANCE("updateDemandDepositAccountWithdrawal");

    private final String code;

    SSAFYCode(String code) {
        this.code = code;
    }
}
