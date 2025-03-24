package com.awoo.payment.ui.exception;

public class AmountInvalidException extends UiException{

	public AmountInvalidException() {
		super(UiErrorCode.AMOUNT_INVALID);
	}
}
