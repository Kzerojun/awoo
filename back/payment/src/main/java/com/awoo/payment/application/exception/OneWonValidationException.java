package com.awoo.payment.application.exception;

public class OneWonValidationException extends ApplicationException{

	public OneWonValidationException(ApplicationErrorCode errorCode) {
		super(errorCode);
	}
}
