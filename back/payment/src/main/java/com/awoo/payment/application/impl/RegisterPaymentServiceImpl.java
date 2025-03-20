package com.awoo.payment.application.impl;

import com.awoo.payment.application.RegisterPaymentService;
import com.awoo.payment.application.command.RegisterPaymentCommand;
import com.awoo.payment.application.exception.ApplicationErrorCode;
import com.awoo.payment.application.exception.PaymentAlreadyRegisterException;
import com.awoo.payment.domain.PaymentEntity;
import com.awoo.payment.domain.PaymentFactory;
import com.awoo.payment.domain.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegisterPaymentServiceImpl implements RegisterPaymentService {

    private final PaymentRepository paymentRepository;
    private final PaymentFactory paymentFactory;


    @Override
    public Integer registerPayment(RegisterPaymentCommand command) {
        paymentRepository.findById(command.memberId())
                .ifPresent(payment -> {
                    throw new PaymentAlreadyRegisterException(ApplicationErrorCode.PAYMENT_ALREADY_REGISTERED);
                });

        PaymentEntity paymentEntity = paymentFactory.createPaymentEntity(command.memberId());
        paymentRepository.store(paymentEntity);

        return paymentEntity.getPaymentId();
    }
}
