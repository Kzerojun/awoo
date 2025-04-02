package com.awoo.payment.application.impl;

import com.awoo.payment.application.RegisterPaymentService;
import com.awoo.payment.application.command.RegisterPaymentCommand;
import com.awoo.payment.application.exception.ApplicationErrorCode;
import com.awoo.payment.application.exception.AuthTokenMismatchException;
import com.awoo.payment.domain.PaymentEntity;
import com.awoo.payment.domain.PaymentFactory;
import com.awoo.payment.domain.PaymentRepository;
import com.awoo.payment.domain.event.KafkaTopic;
import com.awoo.payment.infra.kafka.KafkaProducer;
import com.awoo.payment.infra.kafka.PaymentRegisterEvent;
import com.awoo.payment.infra.redis.RedisHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RegisterPaymentServiceImpl implements RegisterPaymentService {

    private final PaymentRepository paymentRepository;
    private final KafkaProducer kafkaProducer;
    private final PaymentFactory paymentFactory;
    private final RedisHandler redisHandler;


    @Override
    @Transactional
    public Integer registerPayment(RegisterPaymentCommand command) {
        boolean result = redisHandler.verifyAuthToken(command.authToken());
        if (!result) {
            throw new AuthTokenMismatchException(ApplicationErrorCode.AUTH_TOKEN_MISMATCH);
        }

        PaymentEntity paymentEntity = paymentFactory.createPaymentEntity(command.memberId(), command.password());
        paymentRepository.store(paymentEntity);


        kafkaProducer.sendKafkaMessage(KafkaTopic.PAYMENT_REGISTER, new PaymentRegisterEvent(paymentEntity.getMemberId()));
        return paymentEntity.getPaymentId();
    }
}
