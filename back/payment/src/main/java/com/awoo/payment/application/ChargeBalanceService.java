package com.awoo.payment.application;

import com.awoo.payment.application.command.ChargeBalanceCommand;


public interface ChargeBalanceService {

    String chargeBalance(ChargeBalanceCommand command);
}
