package com.awoo.payment.application;

import com.awoo.payment.application.query.FetchBalanceQuery;

import java.math.BigDecimal;

public interface QueryPaymentService {

    BigDecimal fetchBalance(FetchBalanceQuery query);
}
