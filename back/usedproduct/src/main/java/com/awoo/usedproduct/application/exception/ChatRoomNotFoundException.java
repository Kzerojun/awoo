package com.awoo.usedproduct.application.exception;

public class ChatRoomNotFoundException extends ApplicationException{


	public ChatRoomNotFoundException(ApplicationErrorCode applicationErrorCode) {
		super(applicationErrorCode);
	}
}
