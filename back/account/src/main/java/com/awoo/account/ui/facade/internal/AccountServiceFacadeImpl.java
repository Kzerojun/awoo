package com.awoo.account.ui.facade.internal;

import com.awoo.account.application.command.*;
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

    public String createAccount(String memberId, CreateAccountCommand command) throws Exception {
        return accountService.createAccount(memberId, command);
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

    public boolean confirmPassword(String accountNo, String password) {
        return accountService.confirmPassword(accountNo, password);
    }

    public void writeMemo(String memberId, WriteMemoCommand command) {
        accountService.writeMemo(memberId, command);
    }

    public void deleteAccount(String memberId, DeleteAccountCommand command) { accountService.deleteAccount(memberId, command); }

    public void changeLimit(String memberId, ChangeLimitCommand command) {
        accountService.changeLimit(memberId, command);
    }

    public void openAccountAuth(String memberId, String accountNo) {
        accountService.openAccountAuth(memberId, accountNo);
    }

    public void checkAuthCode(String memberId, String accountNo, String authCode) {
        accountService.checkAuthCode(memberId, accountNo, authCode);
    }


}
