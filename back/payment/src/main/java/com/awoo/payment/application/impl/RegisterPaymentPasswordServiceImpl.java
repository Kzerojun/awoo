package com.awoo.payment.application.impl;

import com.awoo.payment.application.RegisterPaymentPasswordService;
import com.awoo.payment.application.command.RegisterPaymentPasswordCommand;
import com.awoo.payment.application.exception.PaymentNotFoundException;
import com.awoo.payment.domain.PaymentEntity;
import com.awoo.payment.domain.PaymentPasswordService;
import com.awoo.payment.domain.PaymentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegisterPaymentPasswordServiceImpl implements RegisterPaymentPasswordService {

    private final PaymentRepository paymentRepository;
    private final PaymentPasswordService paymentPasswordService;

    @Override
    @Transactional
    public void registerPassword(RegisterPaymentPasswordCommand command) {
        PaymentEntity paymentEntity = paymentRepository.findByMemberId(command.memberId()).orElseThrow(PaymentNotFoundException::new);
        paymentPasswordService.registerPassword(command.password(), paymentEntity);
    }
}
