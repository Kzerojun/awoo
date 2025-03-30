package com.awoo.payment.application;

import com.awoo.payment.application.command.VerifyPaymentPasswordCommand;

public interface VerifyPasswordService {

	boolean verifyPassword(VerifyPaymentPasswordCommand command);
}
