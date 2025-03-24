package com.awoo.payment.ui.exception;

public class IdempotencyKeyRequiredException extends UiException{

	public IdempotencyKeyRequiredException() {
		super(UiErrorCode.PASSWORD_REQUIRED);
	}
}
