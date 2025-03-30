package com.awoo.payment.application;

import com.awoo.payment.application.query.FetchBalanceQuery;

public interface QueryPaymentService {

    int fetchBalance(FetchBalanceQuery query);

    String fetchAccount(Integer memberId);
}
