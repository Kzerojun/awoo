package com.awoo.payment.ui.facade.internal;


import com.awoo.payment.application.RegisterPaymentService;
import com.awoo.payment.application.command.RegisterPaymentCommand;
import com.awoo.payment.ui.facade.PaymentServiceFacade;
import com.awoo.payment.ui.facade.dto.response.RegisterPaymentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentServiceFacadeImpl implements PaymentServiceFacade {

    private final RegisterPaymentService registerPaymentService;

    @Override
    public RegisterPaymentResponse register(RegisterPaymentCommand command) {
        return RegisterPaymentResponse.create(registerPaymentService.registerPayment(command));
    }
}
