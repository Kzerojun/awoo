package com.awoo.account.application.service;

import com.awoo.account.application.command.DeductBalanceCommand;

public interface DeductBalanceService {

    void deductBalance(DeductBalanceCommand command);
}
