//package com.awoo.payment.ui.listener;
//
//
//import com.awoo.payment.application.ChargeBalanceService;
//import com.awoo.payment.application.command.ChargeBalanceCommand;
//import com.awoo.payment.ui.listener.event.ChargeBalanceEvent;
//import lombok.RequiredArgsConstructor;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.stereotype.Component;
//
//@Component
//@RequiredArgsConstructor
//public class ChargeBalanceListener {
//
//	private final ChargeBalanceService chargeBalanceService;
//
//	@KafkaListener(topics = "payment-charge")
//	public void chargeBalance(ChargeBalanceEvent event) {
//		ChargeBalanceCommand command = event.toCommand();
//		chargeBalanceService.chargeBalance(command);
//	}
//}
