package com.awoo.account.ui.facade;

import com.awoo.account.application.command.DeductBalanceCommand;
import com.awoo.account.ui.facade.dto.response.DeductBalanceResponse;

public interface AccountServiceFacade {

    DeductBalanceResponse deductBalance(DeductBalanceCommand command);
}