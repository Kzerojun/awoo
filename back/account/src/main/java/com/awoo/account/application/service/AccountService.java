package com.awoo.account.application.service;

import com.awoo.account.application.command.*;
import com.awoo.account.infra.ssafyfinance.response.SSAFYAccountResponseDto;
import com.awoo.account.infra.ssafyfinance.response.SSAFYTransferREC;
import com.awoo.account.ui.facade.dto.response.FetchAccountResponse;
import com.awoo.account.ui.facade.dto.response.TransactionResponse;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface AccountService {
    String createAccount(String memberId, CreateAccountCommand command) throws Exception;
    List<SSAFYAccountResponseDto> getAccountList(String memberId) throws JsonProcessingException;

    List<TransactionResponse> getTransactions(String memberId, TransactionsCommand command);

    List<SSAFYTransferREC> transfer(String memberId, TransferCommand command);

    boolean confirmPassword(String accountNo, String password);

    void writeMemo(String memberId, WriteMemoCommand command);

    void deleteAccount(String memberId, DeleteAccountCommand command);

    void changeLimit(String memberId, ChangeLimitCommand command);

    void openAccountAuth(String memberId, String accountNo);

    void checkAuthCode(String memberId, String accountNo, String authCode);

    List<FetchAccountResponse> fetchAccountAll();
}
