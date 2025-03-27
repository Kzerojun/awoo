package com.awoo.account.ui.facade.internal;

import com.awoo.account.application.command.CreateAccountCommand;
import com.awoo.account.application.command.DeductBalanceCommand;
import com.awoo.account.application.command.TransactionsCommand;
import com.awoo.account.application.command.TransferCommand;
import com.awoo.account.infra.ssafyfinance.response.SSAFYAccountResponseDto;
import com.awoo.account.application.service.AccountService;
import com.awoo.account.application.service.DeductBalanceService;
import com.awoo.account.infra.ssafyfinance.response.SSAFYTransferREC;
import com.awoo.account.ui.facade.AccountServiceFacade;
import com.awoo.account.ui.facade.dto.response.DeductBalanceResponse;
import com.awoo.account.ui.facade.dto.response.TransactionResponse;
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

    public void createAccount(String memberId, CreateAccountCommand command) throws Exception {
        accountService.createAccount(memberId, command);
    }

    public List<SSAFYAccountResponseDto> getAccountList(String memberId) throws JsonProcessingException {
        return accountService.getAccountList(memberId);
    }

    public List<TransactionResponse> getTransactions(String memberId, TransactionsCommand command) {
        return accountService.getTransactions(memberId, command);
    }

    public List<SSAFYTransferREC> transfer(String memberId, TransferCommand command) {
        return accountService.transfer(memberId, command);
    }


}
