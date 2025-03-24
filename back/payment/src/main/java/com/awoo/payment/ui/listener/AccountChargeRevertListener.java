//package com.awoo.payment.ui.listener;
//
//import com.awoo.payment.application.ChargeBalanceCancelService;
//import com.awoo.payment.application.command.ChargeBalanceCancelCommand;
//import com.awoo.payment.ui.facade.dto.request.ChargePaymentBalanceRequest;
//import lombok.RequiredArgsConstructor;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.stereotype.Component;
//
//@Component
//@RequiredArgsConstructor
//public class AccountChargeRevertListener {
//
//	private final ChargeBalanceCancelService chargeBalanceCancelService;
//
////	@KafkaListener(topics = "account-charge-fail")
////	public void processAccountChargeRevertMessage(ChargePaymentBalanceRequest event) {
////		ChargeBalanceCancelCommand command = event.toCommand();
////		chargeBalanceCancelService.cancelCharge(command);
////	}
//}
