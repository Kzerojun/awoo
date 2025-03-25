package com.awoo.payment.ui.facade.internal;


import com.awoo.payment.application.*;
import com.awoo.payment.application.command.ChargeBalanceCommand;
import com.awoo.payment.application.command.RegisterPaymentCommand;
import com.awoo.payment.application.command.RegisterPaymentPasswordCommand;
import com.awoo.payment.application.command.SendAuthPhoneMessageCommand;
import com.awoo.payment.application.query.FetchBalanceQuery;
import com.awoo.payment.ui.facade.PaymentServiceFacade;
import com.awoo.payment.ui.facade.dto.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class PaymentServiceFacadeImpl implements PaymentServiceFacade {

    private final RegisterPaymentService registerPaymentService;
    private final RegisterPaymentPasswordService registerPaymentPasswordService;
    private final QueryPaymentService queryPaymentService;
    private final ChargeBalanceService chargeBalanceService;
    private final SendAuthPhoneMessageService sendAuthPhoneMessageService;

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
    public ChargeBalanceResponse chargeBalance(ChargeBalanceCommand command) {
        chargeBalanceService.chargeBalance(command);
        return ChargeBalanceResponse.create();
    }

    @Override
    public SendAuthPhoneMessageResponse sendAuthPhoneMessage(SendAuthPhoneMessageCommand command) {
        sendAuthPhoneMessageService.sendAuthPhoneMessage(command);
        return SendAuthPhoneMessageResponse.create();
    }
}
