package com.awoo.payment.application.impl;

import com.awoo.payment.application.VerifyPasswordService;
import com.awoo.payment.application.command.VerifyPaymentPasswordCommand;
import com.awoo.payment.application.exception.PaymentNotFoundException;
import com.awoo.payment.domain.PaymentEntity;
import com.awoo.payment.domain.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VerifyPasswordServiceImpl implements VerifyPasswordService {

	private final PaymentRepository paymentRepository;

	@Override
	public boolean verifyPassword(VerifyPaymentPasswordCommand command) {
		PaymentEntity paymentEntity = paymentRepository.findByMemberId(command.memberId())
				.orElseThrow(PaymentNotFoundException::new);
		return paymentEntity.verifyPassword(command.password());
	}
}
