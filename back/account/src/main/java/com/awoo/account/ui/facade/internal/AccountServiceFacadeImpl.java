package com.awoo.account.ui.facade.internal;

import com.awoo.account.application.command.DeductBalanceCommand;
import com.awoo.account.application.dto.SSAFYAccountResponseDto;
import com.awoo.account.application.service.AccountService;
import com.awoo.account.application.service.DeductBalanceService;
import com.awoo.account.ui.facade.AccountServiceFacade;
import com.awoo.account.ui.facade.dto.response.DeductBalanceResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountServiceFacadeImpl implements AccountServiceFacade {

    private final AccountService accountService;
    private final DeductBalanceService deductBalanceService;

    @Override
    public DeductBalanceResponse deductBalance(DeductBalanceCommand command) {
        deductBalanceService.deductBalance(command);
        return DeductBalanceResponse.create();
    }

    public void createAccount(String memberId) throws Exception {
        accountService.createAccount(memberId);
    }

    public List<SSAFYAccountResponseDto> getAccountList(String memberId) throws JsonProcessingException {
        return accountService.getAccountList(memberId);
    }
}
