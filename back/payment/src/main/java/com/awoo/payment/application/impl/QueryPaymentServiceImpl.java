package com.awoo.payment.application.impl;

import com.awoo.payment.application.QueryPaymentService;
import com.awoo.payment.application.exception.PaymentNotFoundException;
import com.awoo.payment.application.query.FetchBalanceQuery;
import com.awoo.payment.domain.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QueryPaymentServiceImpl implements QueryPaymentService {

    private final PaymentRepository paymentRepository;

    @Override
    public int fetchBalance(FetchBalanceQuery query) {
        return paymentRepository.findByMemberId(query.memberId()).orElseThrow(PaymentNotFoundException::new).getBalance();
    }
}
