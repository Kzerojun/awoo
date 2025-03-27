package com.awoo.account.ui.facade;

import com.awoo.account.application.command.CreateSavingAccountCommand;
import com.awoo.account.ui.facade.dto.response.EarlyInterestPayResponse;
import com.awoo.account.ui.facade.dto.response.InquireSavingPaymentResponse;
import com.awoo.account.ui.facade.dto.response.InterestPayResponse;
import com.awoo.account.ui.facade.dto.response.SavingAccountResponse;

import java.util.List;

public interface SavingServiceFacade {
    void createSavingAccount(String memberId, CreateSavingAccountCommand command);

    List<SavingAccountResponse> getSavingAccountList(String memberId);

    InterestPayResponse getInterestPay(String memberId, String accountNo);

    EarlyInterestPayResponse getEarlyInterestPay(String memberId, String accountNo);

    void deleteSavingAccount(String memberId, String accountNo);

    InquireSavingPaymentResponse inquireSavingPayment(String memberId, String accountNo);
}
