//package com.awoo.payment.application.impl;
//
//import com.awoo.payment.application.ChargeBalanceCancelService;
//import com.awoo.payment.application.command.ChargeBalanceCancelCommand;
//import com.awoo.payment.application.exception.PaymentNotFoundException;
//import com.awoo.payment.domain.PaymentEntity;
//import com.awoo.payment.domain.PaymentRepository;
//import com.awoo.payment.domain.event.BalanceChargedCancelEvent;
//import com.awoo.payment.domain.event.KafkaTopic;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class ChargeBalanceCancelServiceImpl implements ChargeBalanceCancelService {
//
//	private final PaymentRepository paymentRepository;
//
//	@Override
//	public void cancelCharge(ChargeBalanceCancelCommand command) {
//		PaymentEntity paymentEntity = paymentRepository.findByMemberId(command.memberId())
//				.orElseThrow(PaymentNotFoundException::new);
//		BalanceChargedCancelEvent event = paymentEntity.cancelCharge(
//				command.amount());
//		kafkaProducer.sendKafkaMessage(KafkaTopic.PAYMENT_CHARGE_COMPENSATE,event);
//	}
//}
