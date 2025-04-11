package com.awoo.payment.support;

import lombok.Getter;

@Getter
public enum SSAFYCode {

    //1원 송금
    ONE_WON_REMITTANCE("openAccountAuth"),
    //1원 검증
    ONE_WON_VERIFICATION("checkAuthCode"),
    DEPOSIT("updateDemandDepositAccountDeposit");

    private final String code;

    SSAFYCode(String code) {
        this.code = code;
    }
}
