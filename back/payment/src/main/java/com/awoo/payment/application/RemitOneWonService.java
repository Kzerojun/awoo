package com.awoo.payment.application;

import com.awoo.payment.application.command.RemitOneWonCommand;

public interface RemitOneWonService {


	void remitOneWon(RemitOneWonCommand command);

}
