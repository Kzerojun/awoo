package com.awoo.account.application.service;

import com.awoo.account.application.command.CreateSavingAccountCommand;

public interface SavingService {
    void createSavingAccount(String memberId, CreateSavingAccountCommand command);
}
