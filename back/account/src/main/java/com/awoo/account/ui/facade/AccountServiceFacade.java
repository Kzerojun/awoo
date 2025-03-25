package com.awoo.account.ui.facade;

import com.awoo.account.application.command.CreateAccountCommand;
import com.awoo.account.application.command.DeductBalanceCommand;
import com.awoo.account.application.command.TransactionsCommand;
import com.awoo.account.application.dto.SSAFYAccountResponseDto;
import com.awoo.account.ui.facade.dto.response.DeductBalanceResponse;
import com.awoo.account.ui.facade.dto.response.TransactionResponse;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface AccountServiceFacade {

    DeductBalanceResponse deductBalance(DeductBalanceCommand command);

    void createAccount(String memberId, CreateAccountCommand command) throws Exception;
    List<SSAFYAccountResponseDto> getAccountList(String memberId) throws JsonProcessingException;
    List<TransactionResponse> getTransactions(String memberId, TransactionsCommand command);
}