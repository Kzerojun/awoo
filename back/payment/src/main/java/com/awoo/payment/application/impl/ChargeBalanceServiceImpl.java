package com.awoo.payment.application.impl;

import com.awoo.payment.application.ChargeBalanceService;
import com.awoo.payment.application.command.ChargeBalanceCommand;
import com.awoo.payment.application.exception.PaymentNotFoundException;
import com.awoo.payment.domain.PaymentEntity;
import com.awoo.payment.domain.PaymentRepository;
import com.awoo.payment.infra.redis.RedisHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class ChargeBalanceServiceImpl implements ChargeBalanceService {

    private final RedisHandler redisHandler;
    private final PaymentRepository paymentRepository;

    @Override
    public String chargeBalance(ChargeBalanceCommand command) {

        // 요청이 처리된적이 있는지 확인
       if((redisHandler.hasIdempotencyKey(command.idempotencyKey()))) {
           return redisHandler.getValue(command.idempotencyKey());
       }

        PaymentEntity paymentEntity = paymentRepository.findByMemberId(command.memberId()).orElseThrow(PaymentNotFoundException::new);
        paymentEntity.
    }
}
