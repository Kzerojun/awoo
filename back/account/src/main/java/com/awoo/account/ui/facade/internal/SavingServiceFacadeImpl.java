package com.awoo.account.ui.facade.internal;

import com.awoo.account.application.command.CreateSavingAccountCommand;
import com.awoo.account.application.service.SavingService;
import com.awoo.account.ui.facade.SavingServiceFacade;
import com.awoo.account.ui.facade.dto.response.EarlyInterestPayResponse;
import com.awoo.account.ui.facade.dto.response.InquireSavingPaymentResponse;
import com.awoo.account.ui.facade.dto.response.InterestPayResponse;
import com.awoo.account.ui.facade.dto.response.SavingAccountResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SavingServiceFacadeImpl implements SavingServiceFacade {

    private final SavingService savingService;

    public void createSavingAccount(String memberId, CreateSavingAccountCommand command) {
        savingService.createSavingAccount(memberId, command);
    }

    public List<SavingAccountResponse> getSavingAccountList(String memberId) {
        return savingService.getSavingAccountList(memberId);
    }

    public SavingAccountResponse getSavingAccount(String memberId, Integer petId) {
        return savingService.getSavingAccount(memberId, petId);
    }

    public InterestPayResponse getInterestPay(String memberId, String accountNo) {
        return savingService.getInterestPay(memberId, accountNo);
    }

    public EarlyInterestPayResponse getEarlyInterestPay(String memberId, String accountNo) {
        return savingService.getEarlyInterestPay(memberId, accountNo);
    }

    public void deleteSavingAccount(String memberId, String accountNo) {
        savingService.deleteSavingAccount(memberId, accountNo);
    }

    public InquireSavingPaymentResponse inquireSavingPayment(String memberId, String accountNo) {
        return savingService.InquireSavingPaymentResponse(memberId, accountNo);
    }
}
