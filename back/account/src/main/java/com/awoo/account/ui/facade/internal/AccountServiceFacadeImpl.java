package com.awoo.account.ui.facade.internal;

import com.awoo.account.application.command.DeductBalanceCommand;
import com.awoo.account.application.service.DeductBalanceService;
import com.awoo.account.ui.facade.AccountServiceFacade;
import com.awoo.account.ui.facade.dto.response.DeductBalanceResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceFacadeImpl implements AccountServiceFacade {

    private final DeductBalanceService deductBalanceService;

    @Override
    public DeductBalanceResponse deductBalance(DeductBalanceCommand command) {
        deductBalanceService.deductBalance(command);
        return DeductBalanceResponse.create();
    }
}
