//package com.awoo.payment.ui.listener.event;
//
//import com.awoo.payment.application.command.ChargeBalanceCancelCommand;
//import com.awoo.payment.application.command.ChargeBalanceCommand;
//import com.awoo.payment.ui.exception.AmountInvalidException;
//import com.awoo.payment.ui.exception.MemberIdInvalidException;
//
//public record ChargeBalanceEvent(Integer memberId, int amount, String idempotencyKey) {
//
//
//	public ChargeBalanceCommand toCommand() {
//		validate();
//		return ChargeBalanceCommand.builder()
//				.memberId(memberId)
//				.amount(amount)
//				.idempotencyKey(idempotencyKey)
//				.build();
//	}
//
//	private void validate() {
//		if (memberId == null || memberId <= 0) {
//			throw new MemberIdInvalidException();
//		}
//		if (amount <= 0) {
//			throw new AmountInvalidException();
//		}
//	}
//}
