package com.awoo.payment.application.impl;

import com.awoo.payment.application.ChargeBalanceService;
import com.awoo.payment.application.command.ChargeBalanceCommand;
import com.awoo.payment.application.exception.PaymentNotFoundException;
import com.awoo.payment.domain.PaymentEntity;
import com.awoo.payment.domain.PaymentRepository;
import com.awoo.payment.infra.client.AccountClient;
import com.awoo.payment.infra.client.request.WithdrawRequest;
import com.awoo.payment.infra.client.response.WithdrawResponse;
import com.awoo.payment.infra.redis.RedisHandler;
import com.awoo.payment.support.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChargeBalanceServiceImpl implements ChargeBalanceService {

    private final RedisHandler redisHandler;
    private final PaymentRepository paymentRepository;
    private final AccountClient accountClient;

    @Override
    public void chargeBalance(ChargeBalanceCommand command) {

        // 요청이 처리된적이 있는지 확인
       if((redisHandler.hasIdempotencyKey(command.idempotencyKey()))) {
            return;
       }

        PaymentEntity paymentEntity = paymentRepository.findByMemberId(command.memberId())
                .orElseThrow(PaymentNotFoundException::new);

        // 계좌 잔액 차감 요청
        WithdrawRequest request = WithdrawRequest.builder()
                .amount(command.amount())
                .memberId(command.memberId())
                .accountNo(paymentEntity.getAccountNo())
                .build();
        ApiResult<WithdrawResponse> response = accountClient.withdraw(request);

        if (response.isSuccess()) {
            paymentEntity.chargeBalance(command.amount());
        }
    }
}
