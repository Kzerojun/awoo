package com.awoo.account.ui.facade.internal;

import com.awoo.account.application.command.CreateSavingAccountCommand;
import com.awoo.account.application.service.SavingService;
import com.awoo.account.ui.facade.SavingServiceFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SavingServiceFacadeImpl implements SavingServiceFacade {

    private final SavingService savingService;

    public void createSavingAccount(String memberId, CreateSavingAccountCommand command) {
        savingService.createSavingAccount(memberId, command);
    }
}
