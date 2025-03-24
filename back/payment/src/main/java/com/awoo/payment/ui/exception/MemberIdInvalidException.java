package com.awoo.payment.ui.exception;

public class MemberIdInvalidException extends UiException {

	public MemberIdInvalidException() {
		super(UiErrorCode.MEMBER_ID_INVALID);
	}
}
