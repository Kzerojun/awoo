package com.awoo.payment.ui.facade.internal;


import com.awoo.payment.application.QueryPaymentService;
import com.awoo.payment.application.RegisterPaymentPasswordService;
import com.awoo.payment.application.RegisterPaymentService;
import com.awoo.payment.application.command.RegisterPaymentCommand;
import com.awoo.payment.application.command.RegisterPaymentPasswordCommand;
import com.awoo.payment.application.query.FetchBalanceQuery;
import com.awoo.payment.ui.facade.PaymentServiceFacade;
import com.awoo.payment.ui.facade.dto.response.FetchBalanceResponse;
import com.awoo.payment.ui.facade.dto.response.RegisterPaymentPasswordResponse;
import com.awoo.payment.ui.facade.dto.response.RegisterPaymentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class PaymentServiceFacadeImpl implements PaymentServiceFacade {

    private final RegisterPaymentService registerPaymentService;
    private final RegisterPaymentPasswordService registerPaymentPasswordService;
    private final QueryPaymentService queryPaymentService;

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
        BigDecimal balance = queryPaymentService.fetchBalance(query);
        return FetchBalanceResponse.create(balance);
    }


}
