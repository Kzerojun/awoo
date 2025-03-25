package com.awoo.payment.application.exception;

public class MemberKeyNotFoundException extends ApplicationException{

	public MemberKeyNotFoundException(ApplicationErrorCode errorCode) {
		super(errorCode);
	}
}
