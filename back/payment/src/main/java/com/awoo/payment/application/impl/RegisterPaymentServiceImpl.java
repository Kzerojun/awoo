package com.awoo.payment.application.impl;

import com.awoo.payment.application.RegisterPaymentService;
import com.awoo.payment.application.command.RegisterPaymentCommand;
import com.awoo.payment.application.exception.ApplicationErrorCode;
import com.awoo.payment.application.exception.AuthTokenMismatchException;
import com.awoo.payment.domain.PaymentEntity;
import com.awoo.payment.domain.PaymentFactory;
import com.awoo.payment.domain.PaymentRepository;
import com.awoo.payment.infra.redis.RedisHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegisterPaymentServiceImpl implements RegisterPaymentService {

    private final PaymentRepository paymentRepository;
    private final PaymentFactory paymentFactory;
    private final RedisHandler redisHandler;


    @Override
    public Integer registerPayment(RegisterPaymentCommand command) {
        boolean result = redisHandler.verifyAuthToken(command.authToken());
        if (!result) {
            throw new AuthTokenMismatchException(ApplicationErrorCode.AUTH_TOKEN_MISMATCH);
        }

        PaymentEntity paymentEntity = paymentFactory.createPaymentEntity(command.memberId(), command.password());
        paymentRepository.store(paymentEntity);
        return paymentEntity.getPaymentId();
    }
}
