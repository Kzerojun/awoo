package com.awoo.payment.ui.facade.internal;


import com.awoo.payment.application.*;
import com.awoo.payment.application.command.*;
import com.awoo.payment.application.query.FetchBalanceQuery;
import com.awoo.payment.ui.facade.PaymentServiceFacade;
import com.awoo.payment.ui.facade.dto.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentServiceFacadeImpl implements PaymentServiceFacade {

    private final RegisterPaymentService registerPaymentService;
    private final RegisterPaymentPasswordService registerPaymentPasswordService;
    private final QueryPaymentService queryPaymentService;
    private final ChargeBalanceService chargeBalanceService;
    private final SendAuthPhoneMessageService sendAuthPhoneMessageService;
    private final CheckAuthCodeService checkAuthCodeService;
    private final RemitOneWonService remitOnewonService;
    private final VerifyOneWonService verifyOneWonService;
    private final VerifyPasswordService verifyPasswordService;

    @Override
    public RegisterPaymentResponse register(RegisterPaymentCommand command) {
        return RegisterPaymentResponse.create(registerPaymentService.registerPayment(command));
    }

    @Override
    public RegisterPaymentPasswordResponse registerPassword(RegisterPaymentPasswordCommand command) {
        registerPaymentPasswordService.registerPassword(command);
        return RegisterPaymentPasswordResponse.create();
    }

    @Override
    public FetchBalanceResponse fetchBalance(FetchBalanceQuery query) {
        int balance = queryPaymentService.fetchBalance(query);
        return FetchBalanceResponse.create(balance);
    }

    @Override
    public FetchPaymentResponse fetchAccount(Integer memberId) {
        String account = queryPaymentService.fetchAccount(memberId);
        return new FetchPaymentResponse(account);
    }

    @Override
    public ChargeBalanceResponse chargeBalance(ChargeBalanceCommand command) {
        chargeBalanceService.chargeBalance(command);
        return ChargeBalanceResponse.create();
    }

    @Override
    public SendAuthPhoneMessageResponse sendAuthPhoneMessage(SendAuthPhoneMessageCommand command) {
        sendAuthPhoneMessageService.sendAuthPhoneMessage(command);
        return SendAuthPhoneMessageResponse.create();
    }

    @Override
    public CheckAuthCodeResponse checkAuthCode(CheckAuthCodeCommand command) {
        String authToken = checkAuthCodeService.checkAuthCode(command);
        return CheckAuthCodeResponse.create(authToken);
    }

    @Override
    public RemitOneWonResponse remitOneWon(RemitOneWonCommand command) {
        remitOnewonService.remitOneWon(command);
        return RemitOneWonResponse.create();
    }

    @Override
    public VerifyOneWonResponse verifyOneWon(VerifyOneWonCommand command) {
        verifyOneWonService.verifyOneWon(command);
        return VerifyOneWonResponse.create();
    }

    @Override
    public VerifyPaymentPasswordResponse verifyPassword(VerifyPaymentPasswordCommand command) {
        boolean result = verifyPasswordService.verifyPassword(command);
        return new VerifyPaymentPasswordResponse(result);
    }
}


