package com.awoo.account.support;

import lombok.Getter;

@Getter
public enum SSAFYCode {

    //잔액조회
    FETCH_BALANCE("inquireDemandDepositAccountBalance"),
    DEDUCT_BALANCE("updateDemandDepositAccountWithdrawal"),

    //계좌생성
    CREATE_ACCOUNT("createDemandDepositAccount"),
    //계좌조회
    ACCOUNT_LIST("inquireDemandDepositAccountList"),
    //거래내역조회
    TransactionLIST("inquireTransactionHistoryList"),
    //계좌이체
    Transfer("updateDemandDepositAccountTransfer"),
    //거래메모작성
    WRITE_MEMO("transactionMemo"),
    DELETE_ACCOUNT("deleteDemandDepositAccount"),
    CHANGE_LIMIT("updateTransferLimit"),

    //적금
    CREATE_SAVING_ACCOUNT("createAccount"),
    SAVING_ACCOUNT_LIST("inquireAccountList"),
    INQUIRE_SAVING_ACCOUNT("inquireAccount"),
    INTEREST_PAYMENT("inquireExpiryInterest"),
    EARLY_INTEREST_PAYMENT("inquireEarlyTerminationInterest"),
    DELETE_SAVING_ACCOUNT("deleteAccount"),
    INQUIRE_SAVING_PAYMENT("inquirePayment"),

    //1원 송검증
    OPEN_ACCOUNT_AUTH("openAccountAuth"),
    CHECK_AUTH_CODE("checkAuthCode");

    private final String code;

    SSAFYCode(String code) {
        this.code = code;
    }
}
