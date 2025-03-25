package com.awoo.payment.application;

import com.awoo.payment.application.command.VerifyOneWonCommand;

public interface VerifyOneWonService {

	void verifyOneWon(VerifyOneWonCommand command);
}
