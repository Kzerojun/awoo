package com.awoo.account.application.service;

import com.awoo.account.application.command.CreateAccountCommand;
import com.awoo.account.application.dto.SSAFYAccountResponseDto;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface AccountService {
    void createAccount(String memberId, CreateAccountCommand command) throws Exception;
    List<SSAFYAccountResponseDto> getAccountList(String memberId) throws JsonProcessingException;
}
