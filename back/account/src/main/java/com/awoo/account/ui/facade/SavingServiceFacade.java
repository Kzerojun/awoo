package com.awoo.account.ui.facade;

import com.awoo.account.application.command.CreateSavingAccountCommand;

public interface SavingServiceFacade {
    void createSavingAccount(String memberId, CreateSavingAccountCommand command);
}
